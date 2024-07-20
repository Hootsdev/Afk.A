import { updateTableData } from "../abex/relicEstimate.js";
import { buttonWrapInput, elTag, Input, newEl, storedValue, } from "../components/helper.js";
import { Iconized } from "./iconized.js";
export const stam = "https://i.imgur.com/n5WOzSZ.png";
const ess = "https://i.imgur.com/Gw216PZ.png";
const clName = "abex resource";
export class IconizedInput extends Iconized {
    value;
    cssName;
    init;
    update;
    constructor(id, src, name, value, cssName) {
        const fnu = (y) => {
            if (y >= 0) {
                this.value = y;
                storedValue(this.name, this.value);
                updateTableData();
            }
        };
        const fni = () => {
            return storedValue(this.name) ? storedValue(this.name).toString() : "0";
        };
        super(id, src, name);
        this.value = value;
        this.cssName = cssName;
        this.init = fni;
        this.update = fnu;
    }
    html() {
        const img = super.html(), container = newEl(elTag.Div, { class: this.cssName }), props = {
            type: Input.Number,
            class: this.cssName,
            name: this.name,
            value: this.init(),
        }, input = buttonWrapInput(newEl(elTag.Input, props), this.update);
        container.appendChild(img);
        container.appendChild(input);
        return container;
    }
}
export class Stamina extends IconizedInput {
    constructor() {
        super(0, stam, "ex-food", 0, clName);
        this.value = parseInt(this.init());
    }
}
export class Essence extends IconizedInput {
    constructor() {
        super(0, ess, "essence", 0, clName);
        this.value = parseInt(this.init());
    }
    html() {
        const r = super.html();
        r.querySelectorAll("button").forEach((x) => {
            x.remove();
        });
        return r;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJleC1yZXNvdXJjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy90eXBlcy9hYmV4LXJlc291cmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMzRCxPQUFPLEVBQ0wsZUFBZSxFQUNmLEtBQUssRUFDTCxLQUFLLEVBQ0wsS0FBSyxFQUNMLFdBQVcsR0FDWixNQUFNLHlCQUF5QixDQUFDO0FBQ2pDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFekMsTUFBTSxDQUFDLE1BQU0sSUFBSSxHQUFHLGlDQUFpQyxDQUFDO0FBQ3RELE1BQU0sR0FBRyxHQUFHLGlDQUFpQyxDQUFDO0FBQzlDLE1BQU0sTUFBTSxHQUFHLGVBQWUsQ0FBQztBQUUvQixNQUFNLE9BQU8sYUFBYyxTQUFRLFFBQVE7SUFPaEM7SUFDQTtJQVBGLElBQUksQ0FBZTtJQUNuQixNQUFNLENBQXNCO0lBQ25DLFlBQ0UsRUFBVSxFQUNWLEdBQVcsRUFDWCxJQUFZLEVBQ0wsS0FBYSxFQUNiLE9BQWU7UUFFdEIsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFTLEVBQUUsRUFBRTtZQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztnQkFDWCxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztnQkFDZixXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ25DLGVBQWUsRUFBRSxDQUFDO1lBQ3BCLENBQUM7UUFDSCxDQUFDLENBQUM7UUFDRixNQUFNLEdBQUcsR0FBRyxHQUFHLEVBQUU7WUFDZixPQUFPLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUMxRSxDQUFDLENBQUM7UUFFRixLQUFLLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztRQWRkLFVBQUssR0FBTCxLQUFLLENBQVE7UUFDYixZQUFPLEdBQVAsT0FBTyxDQUFRO1FBZXRCLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO0lBQ3BCLENBQUM7SUFFRCxJQUFJO1FBQ0YsTUFBTSxHQUFHLEdBQUcsS0FBSyxDQUFDLElBQUksRUFBRSxFQUN0QixTQUFTLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQ3JELEtBQUssR0FBRztZQUNOLElBQUksRUFBRSxLQUFLLENBQUMsTUFBTTtZQUNsQixLQUFLLEVBQUUsSUFBSSxDQUFDLE9BQU87WUFDbkIsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ2YsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUU7U0FDbkIsRUFDRCxLQUFLLEdBQUcsZUFBZSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNsRSxTQUFTLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzNCLFNBQVMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0IsT0FBTyxTQUFTLENBQUM7SUFDbkIsQ0FBQztDQUNGO0FBQ0QsTUFBTSxPQUFPLE9BQVEsU0FBUSxhQUFhO0lBQ3hDO1FBQ0UsS0FBSyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUNyQyxDQUFDO0NBQ0Y7QUFFRCxNQUFNLE9BQU8sT0FBUSxTQUFRLGFBQWE7SUFDeEM7UUFDRSxLQUFLLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRCxJQUFJO1FBQ0YsTUFBTSxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3ZCLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUN6QyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDYixDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sQ0FBQyxDQUFDO0lBQ1gsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXBkYXRlVGFibGVEYXRhIH0gZnJvbSBcIi4uL2FiZXgvcmVsaWNFc3RpbWF0ZS5qc1wiO1xuaW1wb3J0IHtcbiAgYnV0dG9uV3JhcElucHV0LFxuICBlbFRhZyxcbiAgSW5wdXQsXG4gIG5ld0VsLFxuICBzdG9yZWRWYWx1ZSxcbn0gZnJvbSBcIi4uL2NvbXBvbmVudHMvaGVscGVyLmpzXCI7XG5pbXBvcnQgeyBJY29uaXplZCB9IGZyb20gXCIuL2ljb25pemVkLmpzXCI7XG5cbmV4cG9ydCBjb25zdCBzdGFtID0gXCJodHRwczovL2kuaW1ndXIuY29tL241V096U1oucG5nXCI7XG5jb25zdCBlc3MgPSBcImh0dHBzOi8vaS5pbWd1ci5jb20vR3cyMTZQWi5wbmdcIjtcbmNvbnN0IGNsTmFtZSA9IFwiYWJleCByZXNvdXJjZVwiO1xuXG5leHBvcnQgY2xhc3MgSWNvbml6ZWRJbnB1dCBleHRlbmRzIEljb25pemVkIHtcbiAgcHVibGljIGluaXQ6ICgpID0+IHN0cmluZztcbiAgcHVibGljIHVwZGF0ZTogKHg6IG51bWJlcikgPT4gdm9pZDtcbiAgY29uc3RydWN0b3IoXG4gICAgaWQ6IG51bWJlcixcbiAgICBzcmM6IHN0cmluZyxcbiAgICBuYW1lOiBzdHJpbmcsXG4gICAgcHVibGljIHZhbHVlOiBudW1iZXIsXG4gICAgcHVibGljIGNzc05hbWU6IHN0cmluZ1xuICApIHtcbiAgICBjb25zdCBmbnUgPSAoeTogbnVtYmVyKSA9PiB7XG4gICAgICBpZiAoeSA+PSAwKSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB5O1xuICAgICAgICBzdG9yZWRWYWx1ZSh0aGlzLm5hbWUsIHRoaXMudmFsdWUpO1xuICAgICAgICB1cGRhdGVUYWJsZURhdGEoKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IGZuaSA9ICgpID0+IHtcbiAgICAgIHJldHVybiBzdG9yZWRWYWx1ZSh0aGlzLm5hbWUpID8gc3RvcmVkVmFsdWUodGhpcy5uYW1lKS50b1N0cmluZygpIDogXCIwXCI7XG4gICAgfTtcblxuICAgIHN1cGVyKGlkLCBzcmMsIG5hbWUpO1xuXG4gICAgdGhpcy5pbml0ID0gZm5pO1xuICAgIHRoaXMudXBkYXRlID0gZm51O1xuICB9XG5cbiAgaHRtbCgpOiBIVE1MRWxlbWVudCB7XG4gICAgY29uc3QgaW1nID0gc3VwZXIuaHRtbCgpLFxuICAgICAgY29udGFpbmVyID0gbmV3RWwoZWxUYWcuRGl2LCB7IGNsYXNzOiB0aGlzLmNzc05hbWUgfSksXG4gICAgICBwcm9wcyA9IHtcbiAgICAgICAgdHlwZTogSW5wdXQuTnVtYmVyLFxuICAgICAgICBjbGFzczogdGhpcy5jc3NOYW1lLFxuICAgICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICAgIHZhbHVlOiB0aGlzLmluaXQoKSxcbiAgICAgIH0sXG4gICAgICBpbnB1dCA9IGJ1dHRvbldyYXBJbnB1dChuZXdFbChlbFRhZy5JbnB1dCwgcHJvcHMpLCB0aGlzLnVwZGF0ZSk7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGltZyk7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGlucHV0KTtcbiAgICByZXR1cm4gY29udGFpbmVyO1xuICB9XG59XG5leHBvcnQgY2xhc3MgU3RhbWluYSBleHRlbmRzIEljb25pemVkSW5wdXQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigwLCBzdGFtLCBcImV4LWZvb2RcIiwgMCwgY2xOYW1lKTtcbiAgICB0aGlzLnZhbHVlID0gcGFyc2VJbnQodGhpcy5pbml0KCkpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBFc3NlbmNlIGV4dGVuZHMgSWNvbml6ZWRJbnB1dCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKDAsIGVzcywgXCJlc3NlbmNlXCIsIDAsIGNsTmFtZSk7XG4gICAgdGhpcy52YWx1ZSA9IHBhcnNlSW50KHRoaXMuaW5pdCgpKTtcbiAgfVxuXG4gIGh0bWwoKTogSFRNTEVsZW1lbnQge1xuICAgIGNvbnN0IHIgPSBzdXBlci5odG1sKCk7XG4gICAgci5xdWVyeVNlbGVjdG9yQWxsKFwiYnV0dG9uXCIpLmZvckVhY2goKHgpID0+IHtcbiAgICAgIHgucmVtb3ZlKCk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHI7XG4gIH1cbn1cbiJdfQ==