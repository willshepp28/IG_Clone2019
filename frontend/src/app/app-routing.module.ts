import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { ExploreComponent } from "./explore/explore.component";
import { ProfileComponent } from "./profile/profile.component";

import { AuthGuard } from "./auth.guard";
import { PostComponent } from "./profile/post/post.component";
import { PostComponent as OnePostComponent } from "./post/post.component";
import { SavedComponent } from "./profile/saved/saved.component";

const routes: Routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "home", component: HomeComponent, canActivate: [AuthGuard]},
    { path: "signup", component: SignupComponent},
    { path: "post/:id", component: OnePostComponent },
    { path: "profile", component: ProfileComponent, canActivate: [AuthGuard],
    children: [
        {path: '', redirectTo: 'post', pathMatch: "full"},
        {path: 'post', component: PostComponent},
        { path: 'saved', component: SavedComponent}
    ] },
    { path: "login", component: LoginComponent },
    { path: "explore", component: ExploreComponent, canActivate: [AuthGuard]}
];

@NgModule({
    imports: [ RouterModule.forRoot(routes)],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}