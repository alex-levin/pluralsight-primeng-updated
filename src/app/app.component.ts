import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MenuItem } from "primeng/primeng";
import { Menu } from "primeng/components/menu/menu";
import { ActivatedRoute, Router } from "@angular/router";

declare var jQuery: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

    menuItems: MenuItem[];
    miniMenuItems: MenuItem[];

    @ViewChild('bigMenu') bigMenu: Menu;
    @ViewChild('smallMenu') smallMenu: Menu;

    menuSelected = 'menu-selected';
    menuNotSelected = 'menu-not-selected';

    constructor(private router: Router) {

    }

    ngOnInit() {

        let handleSelected = function (event) {
            let allMenus = jQuery(event.originalEvent.target).closest('ul');
            let allLinks = allMenus.find('.menu-selected');

            allLinks.removeClass("menu-selected");
            let selected = jQuery(event.originalEvent.target).closest('a');
            selected.addClass('menu-selected');
        }

        this.menuItems = [
            { label: 'Dashboard', icon: 'fa fa-home', routerLink: ['/dashboard'], command: (event) => handleSelected(event), styleClass: this.menuSelected },
            { label: 'All Times', icon: 'fa fa-calendar', routerLink: ['/alltimes'], command: (event) => handleSelected(event), styleClass: this.menuNotSelected },
            { label: 'My Timesheet', icon: 'fa fa-clock-o', routerLink: ['/timesheet'], command: (event) => handleSelected(event), styleClass: this.menuNotSelected },
            { label: 'Add Project', icon: 'fa fa-tasks', routerLink: ['/projects'], command: (event) => handleSelected(event), styleClass: this.menuNotSelected },
            { label: 'My Profile', icon: 'fa fa-users', routerLink: ['/profile'], command: (event) => handleSelected(event), styleClass: this.menuNotSelected },
            { label: 'Settings', icon: 'fa fa-sliders', routerLink: ['/settings'], command: (event) => handleSelected(event), styleClass: this.menuNotSelected },
        ]

        this.miniMenuItems = [];
        this.menuItems.forEach((item: MenuItem) => {
            let miniItem = { icon: item.icon, routerLink: item.routerLink }
            this.miniMenuItems.push(miniItem);
        })

    }

    selectInitialMenuItemBasedOnUrl() {
        let path = document.location.pathname;
        let menuItem = this.menuItems.find((item) => { return item.routerLink[0] == path });

        // menu-selected is defined in src/styles.css
        if (menuItem) {
            // let selectedIcon = this.bigMenu.container.querySelector(`.${menuItem.icon}`);
            // jQuery(selectedIcon).closest('li').addClass('menu-selected');
            // menuItem.styleClass = this.menuSelected;
            /*
            if(this.bigMenu.container === undefined) {
                for(let mItem of this.menuItems) {
                    if(mItem.label === 'Dashboard') {
                        mItem.styleClass = this.menuSelected;
                    }
                    else {
                        mItem.styleClass = this.menuNotSelected;
                    }
                }
            }
            */
        }
    }

    ngAfterViewInit() {
        this.selectInitialMenuItemBasedOnUrl();
    }
}
