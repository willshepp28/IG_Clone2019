import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { ExploreComponent } from "./explore/explore.component";
import { ProfileComponent } from "./profile/profile.component";

const routes: Routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "home", component: HomeComponent},
    { path: "signup", component: SignupComponent},
    { path: "profile", component: ProfileComponent },
    { path: "login", component: LoginComponent },
    { path: "explore", component: ExploreComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes)],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}