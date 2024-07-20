import { exportToCsv } from "../components/csvexport.js";
import { newEl, createInput, storedValue, newBtn, Input, } from "../components/helper.js";
import { Beasts, Heroes, Renderer } from "../model/afk.js";
import { Team } from "../model/teams.js";
import { Tree } from "../types/inventory.js";
let MetaTeam = new Team();
const petSelectId = "pet-sele";
export function AttackForm() {
    const formId = "team-set";
    const heroSelectId = "hero-selection";
    const heroForm = document.getElementById(formId);
    const atkContainer = newEl("div", { class: "attack-inputs" });
    const attackForm = newEl("form", { id: "team-attacks-form" });
    const addAttack = newBtn("Add Dmg", "add-attack");
    const csvExport = newBtn("Export", "export-csv");
    atkContainer.appendChild(attackForm);
    attackForm.appendChild(newEl("label", { for: "dps", class: "attack-inputs__label" }, "Damage, B."));
    attackForm.appendChild(createInput(Input.Number, {
        class: "attack-inputs__input",
        id: "dps",
        step: "1000",
    }));
    attackForm.appendChild(addAttack);
    attackForm.appendChild(newEl("label", { for: "comm", class: "attack-inputs__label" }, "Comment"));
    attackForm.appendChild(createInput(Input.Text, { class: "attack-inputs__input", id: "comm" }));
    attackForm.appendChild(csvExport);
    atkContainer.addEventListener("change", (x) => {
        const tg = x.target;
        $(tg).attr("value", tg.value);
    });
    let table = `
<table id="dps-table" style="width:100%">
<thead>
<tr>
<th>Team</th>
<th class="fit">Pet</th>
<th>Elder Tree</th> 
<th>Damage</th>
<th>Comment</th>
</tr>
</thead>
<tbody>
</tbody>
</table>
`;
    csvExport.addEventListener("click", (e) => {
        const o = MetaTeam.damage.map((x) => [
            MetaTeam.Heroes()
                .map((y) => y.short)
                .join("|"),
            MetaTeam.pet.name,
            MetaTeam.elderTree.map((x) => `${x.name}:${x.value}`).join("|"),
            x[0].toString(),
            x[1].toString(),
        ]);
        exportToCsv("data.csv", o, [
            "Team",
            "Pet",
            "Elder Tree",
            "Damage",
            "Comment",
        ]);
    });
    attackForm.appendChild(newEl("output", {
        name: "battle-stat",
        id: "bat-stat",
    }));
    jQuery(atkContainer).appendTo("#attack-app");
    jQuery(table).appendTo("#bat-stat");
    const treeDiv = newEl("div", { class: `${formId}-inputs` });
    for (const v of Tree) {
        const lb = newEl("label", { for: `${formId}-input-tree-${v.name}` });
        const inp = createInput(Input.Number, {
            class: `${formId}-inputs-number`,
            id: `${formId}-input-tree-${v.name}`,
            min: "0",
            max: "200",
            value: storedValue(v.name)
                ? storedValue(v.name)
                : v.value.toString(),
        });
        inp.onchange = updOnChange;
        lb.appendChild(newEl("img", { src: v.icon }));
        lb.appendChild(inp);
        treeDiv.appendChild(lb);
    }
    addAttack.addEventListener("click", (e) => {
        const text = `
    <tr>
    <td>${MetaTeam.Heroes()
            .map((x) => Renderer.Icon(x.icon, x.name))
            .join(" | ")}</td>
      <td>${Renderer.Icon(MetaTeam.pet.icon, MetaTeam.pet.name)}</td>
      <td>${MetaTeam.TreeString()}</td>
      <td>${$("#dps").val()}</td>
      <td>${$("#comm").val()}</td>
      </tr>
      `;
        MetaTeam.makeAttack(parseInt($("#dps").val().toString()), $("#comm").val().toString());
        $(text).appendTo("#dps-table > tbody");
    });
    const petCheckBoxes = checkBoxSelector(petSelectId, Beasts, petClick);
    const heroselector = checkBoxSelector(heroSelectId, Heroes, heroClick);
    heroselector.addEventListener("click", (x) => {
        const tg = x.target;
        const offElement = tg.offsetParent;
        const inp = offElement?.control;
        if (MetaTeam.Heroes().length >= 5 && !inp.checked) {
            x.preventDefault();
            x.stopPropagation();
            x.stopImmediatePropagation();
            return false;
        }
    });
    heroForm.appendChild(newEl("h2", {}, "Set Elder Tree"));
    heroForm.appendChild(treeDiv);
    heroForm.appendChild(newEl("h2", {}, "Choose Pet"));
    heroForm.appendChild(petCheckBoxes);
    heroForm.appendChild(newEl("h2", {}, "Choose Team"));
    heroForm.appendChild(heroselector);
    jQuery(`<div class="${formId}-nav">
      <div class="${formId}-button ${formId}-up">+</div>
      <div class="${formId}-button ${formId}-down">-</div>
    </div>`).insertAfter(`.${formId} input[type="number"], #${formId} input[type="number"]`);
    jQuery(`#${formId} label`).each(function () {
        var spinner = jQuery(this), input = spinner.find('input[type="number"]'), btnUp = spinner.find(`.${formId}-up`), btnDown = spinner.find(`.${formId}-down`), min = parseInt(input.attr("min")), max = parseInt(input.attr("max"));
        btnUp.on("click", function () {
            const oldValue = parseFloat(input.val().toString());
            if (oldValue >= max) {
                var newVal = oldValue;
            }
            else {
                var newVal = oldValue + 1;
            }
            input.val(newVal);
            input.trigger("change");
        });
        btnDown.on("click", function () {
            let oldValue = parseFloat(input.val().toString());
            if (oldValue <= min) {
                var newVal = oldValue;
            }
            else {
                var newVal = oldValue - 1;
            }
            input.val(newVal);
            input.trigger("change");
        });
    });
}
function heroClick(e) {
    const tg = e.target;
    const clickedHero = Heroes.find((x) => x.name.includes(tg.id.substring(7)));
    if (tg.checked) {
        MetaTeam.addToTeam(clickedHero);
    }
    else {
        MetaTeam.removeHero(clickedHero);
    }
}
function petClick(e) {
    const tg = e.target;
    const petGroup = document.querySelectorAll(`.${petSelectId} input`);
    const clickedPet = Beasts.find((x) => x.name.includes(tg.id.substring(7)));
    petGroup.forEach((x) => {
        if (!x.id.includes(clickedPet.name))
            x.checked = false;
    });
    MetaTeam.pet = clickedPet;
}
function checkBoxSelector(id, data, fn) {
    const container = newEl("div", { class: id });
    const ul = document.createElement("ul");
    for (const h of data) {
        const li = document.createElement("li");
        const checkBox = createInput(Input.CheckBox, {
            id: `ch-${id.substring(0, 3)}-${h.name}`,
        });
        checkBox.onchange = fn;
        const lb = newEl("label", { for: `ch-${id.substring(0, 3)}-${h.name}` });
        lb.appendChild(newEl("img", { src: h.icon }));
        li.appendChild(checkBox);
        li.appendChild(lb);
        ul.appendChild(li);
    }
    container.appendChild(ul);
    return container;
}
function updOnChange(e) {
    const tg = e.target;
    $(tg).attr("value", tg.value);
    MetaTeam.setElderTree(tg.id.split("-").slice(-1)[0], parseInt(tg.value));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXR0YWNrZm9ybS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hYmV4L2F0dGFja2Zvcm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3pELE9BQU8sRUFDTCxLQUFLLEVBQ0wsV0FBVyxFQUNYLFdBQVcsRUFDWCxNQUFNLEVBQ04sS0FBSyxHQUNOLE1BQU0seUJBQXlCLENBQUM7QUFDakMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0QsT0FBTyxFQUFhLElBQUksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUU3QyxJQUFJLFFBQVEsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO0FBQzFCLE1BQU0sV0FBVyxHQUFHLFVBQVUsQ0FBQztBQUUvQixNQUFNLFVBQVUsVUFBVTtJQUN4QixNQUFNLE1BQU0sR0FBRyxVQUFVLENBQUM7SUFDMUIsTUFBTSxZQUFZLEdBQUcsZ0JBQWdCLENBQUM7SUFFdEMsTUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUVqRCxNQUFNLFlBQVksR0FBRyxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBRSxDQUFDLENBQUM7SUFDOUQsTUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxFQUFFLEVBQUUsRUFBRSxtQkFBbUIsRUFBRSxDQUFDLENBQUM7SUFFOUQsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsRUFBRSxZQUFZLENBQUMsQ0FBQztJQUNsRCxNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsUUFBUSxFQUFFLFlBQVksQ0FBQyxDQUFDO0lBRWpELFlBQVksQ0FBQyxXQUFX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QUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUIsUUFBUSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFDM0UsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGV4cG9ydFRvQ3N2IH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvY3N2ZXhwb3J0LmpzXCI7XG5pbXBvcnQge1xuICBuZXdFbCxcbiAgY3JlYXRlSW5wdXQsXG4gIHN0b3JlZFZhbHVlLFxuICBuZXdCdG4sXG4gIElucHV0LFxufSBmcm9tIFwiLi4vY29tcG9uZW50cy9oZWxwZXIuanNcIjtcbmltcG9ydCB7IEJlYXN0cywgSGVyb2VzLCBSZW5kZXJlciB9IGZyb20gXCIuLi9tb2RlbC9hZmsuanNcIjtcbmltcG9ydCB7IEFma09iamVjdCwgVGVhbSB9IGZyb20gXCIuLi9tb2RlbC90ZWFtcy5qc1wiO1xuaW1wb3J0IHsgVHJlZSB9IGZyb20gXCIuLi90eXBlcy9pbnZlbnRvcnkuanNcIjtcblxubGV0IE1ldGFUZWFtID0gbmV3IFRlYW0oKTtcbmNvbnN0IHBldFNlbGVjdElkID0gXCJwZXQtc2VsZVwiO1xuXG5leHBvcnQgZnVuY3Rpb24gQXR0YWNrRm9ybSgpIHtcbiAgY29uc3QgZm9ybUlkID0gXCJ0ZWFtLXNldFwiO1xuICBjb25zdCBoZXJvU2VsZWN0SWQgPSBcImhlcm8tc2VsZWN0aW9uXCI7XG5cbiAgY29uc3QgaGVyb0Zvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChmb3JtSWQpO1xuXG4gIGNvbnN0IGF0a0NvbnRhaW5lciA9IG5ld0VsKFwiZGl2XCIsIHsgY2xhc3M6IFwiYXR0YWNrLWlucHV0c1wiIH0pO1xuICBjb25zdCBhdHRhY2tGb3JtID0gbmV3RWwoXCJmb3JtXCIsIHsgaWQ6IFwidGVhbS1hdHRhY2tzLWZvcm1cIiB9KTtcblxuICBjb25zdCBhZGRBdHRhY2sgPSBuZXdCdG4oXCJBZGQgRG1nXCIsIFwiYWRkLWF0dGFja1wiKTtcbiAgY29uc3QgY3N2RXhwb3J0ID0gbmV3QnRuKFwiRXhwb3J0XCIsIFwiZXhwb3J0LWNzdlwiKTtcblxuICBhdGtDb250YWluZXIuYXBwZW5kQ2hpbGQoYXR0YWNrRm9ybSk7XG5cbiAgYXR0YWNrRm9ybS5hcHBlbmRDaGlsZChcbiAgICBuZXdFbChcImxhYmVsXCIsIHsgZm9yOiBcImRwc1wiLCBjbGFzczogXCJhdHRhY2staW5wdXRzX19sYWJlbFwiIH0sIFwiRGFtYWdlLCBCLlwiKVxuICApO1xuICBhdHRhY2tGb3JtLmFwcGVuZENoaWxkKFxuICAgIGNyZWF0ZUlucHV0KElucHV0Lk51bWJlciwge1xuICAgICAgY2xhc3M6IFwiYXR0YWNrLWlucHV0c19faW5wdXRcIixcbiAgICAgIGlkOiBcImRwc1wiLFxuICAgICAgc3RlcDogXCIxMDAwXCIsXG4gICAgfSlcbiAgKTtcbiAgYXR0YWNrRm9ybS5hcHBlbmRDaGlsZChhZGRBdHRhY2spO1xuICBhdHRhY2tGb3JtLmFwcGVuZENoaWxkKFxuICAgIG5ld0VsKFwibGFiZWxcIiwgeyBmb3I6IFwiY29tbVwiLCBjbGFzczogXCJhdHRhY2staW5wdXRzX19sYWJlbFwiIH0sIFwiQ29tbWVudFwiKVxuICApO1xuICBhdHRhY2tGb3JtLmFwcGVuZENoaWxkKFxuICAgIGNyZWF0ZUlucHV0KElucHV0LlRleHQsIHsgY2xhc3M6IFwiYXR0YWNrLWlucHV0c19faW5wdXRcIiwgaWQ6IFwiY29tbVwiIH0pXG4gICk7XG4gIGF0dGFja0Zvcm0uYXBwZW5kQ2hpbGQoY3N2RXhwb3J0KTtcbiAgYXRrQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKHg6IElucHV0RXZlbnQpID0+IHtcbiAgICBjb25zdCB0ZyA9IHgudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgJCh0ZykuYXR0cihcInZhbHVlXCIsIHRnLnZhbHVlKTtcbiAgfSk7XG5cbiAgbGV0IHRhYmxlID0gYFxuPHRhYmxlIGlkPVwiZHBzLXRhYmxlXCIgc3R5bGU9XCJ3aWR0aDoxMDAlXCI+XG48dGhlYWQ+XG48dHI+XG48dGg+VGVhbTwvdGg+XG48dGggY2xhc3M9XCJmaXRcIj5QZXQ8L3RoPlxuPHRoPkVsZGVyIFRyZWU8L3RoPiBcbjx0aD5EYW1hZ2U8L3RoPlxuPHRoPkNvbW1lbnQ8L3RoPlxuPC90cj5cbjwvdGhlYWQ+XG48dGJvZHk+XG48L3Rib2R5PlxuPC90YWJsZT5cbmA7XG5cbiAgY3N2RXhwb3J0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgIGNvbnN0IG8gPSBNZXRhVGVhbS5kYW1hZ2UubWFwKCh4KSA9PiBbXG4gICAgICBNZXRhVGVhbS5IZXJvZXMoKVxuICAgICAgICAubWFwKCh5KSA9PiB5LnNob3J0KVxuICAgICAgICAuam9pbihcInxcIiksXG4gICAgICBNZXRhVGVhbS5wZXQubmFtZSxcbiAgICAgIE1ldGFUZWFtLmVsZGVyVHJlZS5tYXAoKHgpID0+IGAke3gubmFtZX06JHt4LnZhbHVlfWApLmpvaW4oXCJ8XCIpLFxuICAgICAgeFswXS50b1N0cmluZygpLFxuICAgICAgeFsxXS50b1N0cmluZygpLFxuICAgIF0pO1xuICAgIGV4cG9ydFRvQ3N2KFwiZGF0YS5jc3ZcIiwgbywgW1xuICAgICAgXCJUZWFtXCIsXG4gICAgICBcIlBldFwiLFxuICAgICAgXCJFbGRlciBUcmVlXCIsXG4gICAgICBcIkRhbWFnZVwiLFxuICAgICAgXCJDb21tZW50XCIsXG4gICAgXSk7XG4gIH0pO1xuXG4gIGF0dGFja0Zvcm0uYXBwZW5kQ2hpbGQoXG4gICAgbmV3RWwoXCJvdXRwdXRcIiwge1xuICAgICAgbmFtZTogXCJiYXR0bGUtc3RhdFwiLFxuICAgICAgaWQ6IFwiYmF0LXN0YXRcIixcbiAgICB9KVxuICApO1xuICBqUXVlcnkoYXRrQ29udGFpbmVyKS5hcHBlbmRUbyhcIiNhdHRhY2stYXBwXCIpO1xuICBqUXVlcnkodGFibGUpLmFwcGVuZFRvKFwiI2JhdC1zdGF0XCIpO1xuXG4gIGNvbnN0IHRyZWVEaXYgPSBuZXdFbChcImRpdlwiLCB7IGNsYXNzOiBgJHtmb3JtSWR9LWlucHV0c2AgfSk7XG5cbiAgZm9yIChjb25zdCB2IG9mIFRyZWUpIHtcbiAgICBjb25zdCBsYiA9IG5ld0VsKFwibGFiZWxcIiwgeyBmb3I6IGAke2Zvcm1JZH0taW5wdXQtdHJlZS0ke3YubmFtZX1gIH0pO1xuICAgIGNvbnN0IGlucCA9IGNyZWF0ZUlucHV0KElucHV0Lk51bWJlciwge1xuICAgICAgY2xhc3M6IGAke2Zvcm1JZH0taW5wdXRzLW51bWJlcmAsXG4gICAgICBpZDogYCR7Zm9ybUlkfS1pbnB1dC10cmVlLSR7di5uYW1lfWAsXG4gICAgICBtaW46IFwiMFwiLFxuICAgICAgbWF4OiBcIjIwMFwiLFxuICAgICAgdmFsdWU6IHN0b3JlZFZhbHVlKHYubmFtZSlcbiAgICAgICAgPyAoc3RvcmVkVmFsdWUodi5uYW1lKSBhcyBzdHJpbmcpXG4gICAgICAgIDogdi52YWx1ZS50b1N0cmluZygpLFxuICAgIH0pO1xuICAgIGlucC5vbmNoYW5nZSA9IHVwZE9uQ2hhbmdlO1xuICAgIGxiLmFwcGVuZENoaWxkKG5ld0VsKFwiaW1nXCIsIHsgc3JjOiB2Lmljb24gfSkpO1xuICAgIGxiLmFwcGVuZENoaWxkKGlucCk7XG4gICAgdHJlZURpdi5hcHBlbmRDaGlsZChsYik7XG4gIH1cblxuICBhZGRBdHRhY2suYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgY29uc3QgdGV4dCA9IGBcbiAgICA8dHI+XG4gICAgPHRkPiR7TWV0YVRlYW0uSGVyb2VzKClcbiAgICAgIC5tYXAoKHgpID0+IFJlbmRlcmVyLkljb24oeC5pY29uLCB4Lm5hbWUpKVxuICAgICAgLmpvaW4oXCIgfCBcIil9PC90ZD5cbiAgICAgIDx0ZD4ke1JlbmRlcmVyLkljb24oTWV0YVRlYW0ucGV0Lmljb24sIE1ldGFUZWFtLnBldC5uYW1lKX08L3RkPlxuICAgICAgPHRkPiR7TWV0YVRlYW0uVHJlZVN0cmluZygpfTwvdGQ+XG4gICAgICA8dGQ+JHskKFwiI2Rwc1wiKS52YWwoKX08L3RkPlxuICAgICAgPHRkPiR7JChcIiNjb21tXCIpLnZhbCgpfTwvdGQ+XG4gICAgICA8L3RyPlxuICAgICAgYDtcbiAgICBNZXRhVGVhbS5tYWtlQXR0YWNrKFxuICAgICAgcGFyc2VJbnQoJChcIiNkcHNcIikudmFsKCkudG9TdHJpbmcoKSksXG4gICAgICAkKFwiI2NvbW1cIikudmFsKCkudG9TdHJpbmcoKVxuICAgICk7XG4gICAgJCh0ZXh0KS5hcHBlbmRUbyhcIiNkcHMtdGFibGUgPiB0Ym9keVwiKTtcbiAgfSk7XG5cbiAgY29uc3QgcGV0Q2hlY2tCb3hlcyA9IGNoZWNrQm94U2VsZWN0b3IocGV0U2VsZWN0SWQsIEJlYXN0cywgcGV0Q2xpY2spO1xuICBjb25zdCBoZXJvc2VsZWN0b3IgPSBjaGVja0JveFNlbGVjdG9yKGhlcm9TZWxlY3RJZCwgSGVyb2VzLCBoZXJvQ2xpY2spO1xuICBoZXJvc2VsZWN0b3IuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICh4KSA9PiB7XG4gICAgY29uc3QgdGcgPSB4LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICAgIGNvbnN0IG9mZkVsZW1lbnQgPSB0Zy5vZmZzZXRQYXJlbnQgYXMgSFRNTExhYmVsRWxlbWVudDtcbiAgICBjb25zdCBpbnAgPSBvZmZFbGVtZW50Py5jb250cm9sIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgaWYgKE1ldGFUZWFtLkhlcm9lcygpLmxlbmd0aCA+PSA1ICYmICFpbnAuY2hlY2tlZCkge1xuICAgICAgeC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgeC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIHguc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9KTtcblxuICBoZXJvRm9ybS5hcHBlbmRDaGlsZChuZXdFbChcImgyXCIsIHt9LCBcIlNldCBFbGRlciBUcmVlXCIpKTtcbiAgaGVyb0Zvcm0uYXBwZW5kQ2hpbGQodHJlZURpdik7XG5cbiAgaGVyb0Zvcm0uYXBwZW5kQ2hpbGQobmV3RWwoXCJoMlwiLCB7fSwgXCJDaG9vc2UgUGV0XCIpKTtcbiAgaGVyb0Zvcm0uYXBwZW5kQ2hpbGQocGV0Q2hlY2tCb3hlcyk7XG4gIGhlcm9Gb3JtLmFwcGVuZENoaWxkKG5ld0VsKFwiaDJcIiwge30sIFwiQ2hvb3NlIFRlYW1cIikpO1xuICBoZXJvRm9ybS5hcHBlbmRDaGlsZChoZXJvc2VsZWN0b3IpO1xuICAvLyAgRUxERVIgVFJFRSBIQU5ETEVSXG4gIGpRdWVyeShcbiAgICBgPGRpdiBjbGFzcz1cIiR7Zm9ybUlkfS1uYXZcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCIke2Zvcm1JZH0tYnV0dG9uICR7Zm9ybUlkfS11cFwiPis8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCIke2Zvcm1JZH0tYnV0dG9uICR7Zm9ybUlkfS1kb3duXCI+LTwvZGl2PlxuICAgIDwvZGl2PmBcbiAgKS5pbnNlcnRBZnRlcihcbiAgICBgLiR7Zm9ybUlkfSBpbnB1dFt0eXBlPVwibnVtYmVyXCJdLCAjJHtmb3JtSWR9IGlucHV0W3R5cGU9XCJudW1iZXJcIl1gXG4gICk7XG5cbiAgalF1ZXJ5KGAjJHtmb3JtSWR9IGxhYmVsYCkuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHNwaW5uZXIgPSBqUXVlcnkodGhpcyksXG4gICAgICBpbnB1dCA9IHNwaW5uZXIuZmluZCgnaW5wdXRbdHlwZT1cIm51bWJlclwiXScpLFxuICAgICAgYnRuVXAgPSBzcGlubmVyLmZpbmQoYC4ke2Zvcm1JZH0tdXBgKSxcbiAgICAgIGJ0bkRvd24gPSBzcGlubmVyLmZpbmQoYC4ke2Zvcm1JZH0tZG93bmApLFxuICAgICAgbWluID0gcGFyc2VJbnQoaW5wdXQuYXR0cihcIm1pblwiKSksXG4gICAgICBtYXggPSBwYXJzZUludChpbnB1dC5hdHRyKFwibWF4XCIpKTtcblxuICAgIGJ0blVwLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3Qgb2xkVmFsdWUgPSBwYXJzZUZsb2F0KGlucHV0LnZhbCgpLnRvU3RyaW5nKCkpO1xuICAgICAgaWYgKG9sZFZhbHVlID49IG1heCkge1xuICAgICAgICB2YXIgbmV3VmFsID0gb2xkVmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgbmV3VmFsID0gb2xkVmFsdWUgKyAxO1xuICAgICAgfVxuICAgICAgaW5wdXQudmFsKG5ld1ZhbCk7XG4gICAgICBpbnB1dC50cmlnZ2VyKFwiY2hhbmdlXCIpO1xuICAgIH0pO1xuXG4gICAgYnRuRG93bi5vbihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGxldCBvbGRWYWx1ZSA9IHBhcnNlRmxvYXQoaW5wdXQudmFsKCkudG9TdHJpbmcoKSk7XG4gICAgICBpZiAob2xkVmFsdWUgPD0gbWluKSB7XG4gICAgICAgIHZhciBuZXdWYWwgPSBvbGRWYWx1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBuZXdWYWwgPSBvbGRWYWx1ZSAtIDE7XG4gICAgICB9XG4gICAgICBpbnB1dC52YWwobmV3VmFsKTtcbiAgICAgIGlucHV0LnRyaWdnZXIoXCJjaGFuZ2VcIik7XG4gICAgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBoZXJvQ2xpY2soZTogSW5wdXRFdmVudCkge1xuICBjb25zdCB0ZyA9IGUudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gIGNvbnN0IGNsaWNrZWRIZXJvID0gSGVyb2VzLmZpbmQoKHgpID0+IHgubmFtZS5pbmNsdWRlcyh0Zy5pZC5zdWJzdHJpbmcoNykpKTtcbiAgaWYgKHRnLmNoZWNrZWQpIHtcbiAgICBNZXRhVGVhbS5hZGRUb1RlYW0oY2xpY2tlZEhlcm8pO1xuICB9IGVsc2Uge1xuICAgIE1ldGFUZWFtLnJlbW92ZUhlcm8oY2xpY2tlZEhlcm8pO1xuICB9XG59XG5cbmZ1bmN0aW9uIHBldENsaWNrKGU6IElucHV0RXZlbnQpIHtcbiAgY29uc3QgdGcgPSBlLnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICBjb25zdCBwZXRHcm91cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC4ke3BldFNlbGVjdElkfSBpbnB1dGApO1xuICBjb25zdCBjbGlja2VkUGV0ID0gQmVhc3RzLmZpbmQoKHgpID0+IHgubmFtZS5pbmNsdWRlcyh0Zy5pZC5zdWJzdHJpbmcoNykpKTtcbiAgcGV0R3JvdXAuZm9yRWFjaCgoeDogSFRNTElucHV0RWxlbWVudCkgPT4ge1xuICAgIGlmICgheC5pZC5pbmNsdWRlcyhjbGlja2VkUGV0Lm5hbWUpKSB4LmNoZWNrZWQgPSBmYWxzZTtcbiAgfSk7XG4gIE1ldGFUZWFtLnBldCA9IGNsaWNrZWRQZXQ7XG59XG5cbmZ1bmN0aW9uIGNoZWNrQm94U2VsZWN0b3IoXG4gIGlkOiBzdHJpbmcsXG4gIGRhdGE6IEFma09iamVjdFtdLFxuICBmbjoge1xuICAgIChlOiBJbnB1dEV2ZW50KTogdm9pZDtcbiAgICAoZTogSW5wdXRFdmVudCk6IHZvaWQ7XG4gICAgKHRoaXM6IEdsb2JhbEV2ZW50SGFuZGxlcnMsIGV2OiBFdmVudCk6IGFueTtcbiAgfVxuKSB7XG4gIGNvbnN0IGNvbnRhaW5lciA9IG5ld0VsKFwiZGl2XCIsIHsgY2xhc3M6IGlkIH0pO1xuXG4gIGNvbnN0IHVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInVsXCIpO1xuICBmb3IgKGNvbnN0IGggb2YgZGF0YSkge1xuICAgIGNvbnN0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICAgIGNvbnN0IGNoZWNrQm94ID0gY3JlYXRlSW5wdXQoSW5wdXQuQ2hlY2tCb3gsIHtcbiAgICAgIGlkOiBgY2gtJHtpZC5zdWJzdHJpbmcoMCwgMyl9LSR7aC5uYW1lfWAsXG4gICAgfSk7XG4gICAgY2hlY2tCb3gub25jaGFuZ2UgPSBmbjtcbiAgICBjb25zdCBsYiA9IG5ld0VsKFwibGFiZWxcIiwgeyBmb3I6IGBjaC0ke2lkLnN1YnN0cmluZygwLCAzKX0tJHtoLm5hbWV9YCB9KTtcbiAgICBsYi5hcHBlbmRDaGlsZChuZXdFbChcImltZ1wiLCB7IHNyYzogaC5pY29uIH0pKTtcbiAgICBsaS5hcHBlbmRDaGlsZChjaGVja0JveCk7XG4gICAgbGkuYXBwZW5kQ2hpbGQobGIpO1xuICAgIHVsLmFwcGVuZENoaWxkKGxpKTtcbiAgfVxuICBjb250YWluZXIuYXBwZW5kQ2hpbGQodWwpO1xuICByZXR1cm4gY29udGFpbmVyO1xufVxuXG5mdW5jdGlvbiB1cGRPbkNoYW5nZShlOiBJbnB1dEV2ZW50KSB7XG4gIGNvbnN0IHRnID0gZS50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgJCh0ZykuYXR0cihcInZhbHVlXCIsIHRnLnZhbHVlKTtcbiAgTWV0YVRlYW0uc2V0RWxkZXJUcmVlKHRnLmlkLnNwbGl0KFwiLVwiKS5zbGljZSgtMSlbMF0sIHBhcnNlSW50KHRnLnZhbHVlKSk7XG59XG4iXX0=