import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "../material.module";
import { AudiostoreRoutingModule } from "./audiostore-routing.module";
import { AudiostoreComponent } from "./audiostore.component";
import { CatalogComponent } from "./catalog/catalog.component";
import { EditComponent } from "./edit/edit.component";
import { ReviewComponent } from "./review/review.component";


@NgModule({
    declarations: [
        AudiostoreComponent,
        CatalogComponent,
        ReviewComponent,
        EditComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        AudiostoreRoutingModule,
        ReactiveFormsModule,
        MaterialModule
    ]
})

export class AudiostoreModule {

}