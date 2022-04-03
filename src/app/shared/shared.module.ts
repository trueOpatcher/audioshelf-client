import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SpinnerComponent } from "./spinner/spinner.component";

@NgModule({
    declarations: [
        SpinnerComponent
    ],
    imports: [CommonModule],
    exports: [
        CommonModule,
        SpinnerComponent
    ]
})

export class SharedModule {

}