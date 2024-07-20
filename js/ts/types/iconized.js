import { elTag, newEl } from "../components/helper.js";
export class Iconized {
    id;
    icon;
    name;
    constructor(id, icon, name) {
        this.id = id;
        this.icon = icon;
        this.name = name;
    }
    html() {
        return newEl(elTag.Img, { src: this.icon, alt: this.name });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNvbml6ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvdHlwZXMvaWNvbml6ZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUV2RCxNQUFNLE9BQU8sUUFBUTtJQUNBO0lBQW1CO0lBQXFCO0lBQTNELFlBQW1CLEVBQVUsRUFBUyxJQUFZLEVBQVMsSUFBWTtRQUFwRCxPQUFFLEdBQUYsRUFBRSxDQUFRO1FBQVMsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUFTLFNBQUksR0FBSixJQUFJLENBQVE7SUFBRyxDQUFDO0lBRTNFLElBQUk7UUFDRixPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQzlELENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGVsVGFnLCBuZXdFbCB9IGZyb20gXCIuLi9jb21wb25lbnRzL2hlbHBlci5qc1wiO1xuXG5leHBvcnQgY2xhc3MgSWNvbml6ZWQge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgaWQ6IG51bWJlciwgcHVibGljIGljb246IHN0cmluZywgcHVibGljIG5hbWU6IHN0cmluZykge31cblxuICBodG1sKCkge1xuICAgIHJldHVybiBuZXdFbChlbFRhZy5JbWcsIHsgc3JjOiB0aGlzLmljb24sIGFsdDogdGhpcy5uYW1lIH0pO1xuICB9XG59XG4iXX0=