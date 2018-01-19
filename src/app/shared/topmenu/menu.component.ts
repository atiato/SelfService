import { Component, Input, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
declare var jQuery: any;

@Component({
    selector: 'menu',
    //template: `<div role="navigation">
    //                <div class="container">
    //                    <div class="collapse navbar-collapse">
    //                        <ul class="nav navbar-nav">
    //                            <li *ngFor="let menu of Menus"><menuitem [MenuItem]="menu"></menuitem></li>
    //                        </ul>
    //                    </div>
    //                </div>
    //            </div>`,
    templateUrl: 'menu1.component.html'
})
export class MenuComponent implements OnInit, AfterViewInit {
    Menus = [{ 'desc': 'Menu 1', 'menus': [{ 'desc': 'Menu 4' }, { 'desc': 'Menu 5', 'menus': [{ 'desc': 'Menu 10', 'menus': [{ 'desc': 'Menu 12' }, { 'desc': 'Menu 13' }] }, { 'desc': 'Menu 11' }] }, { 'desc': 'Menu 6' }, { 'desc': 'Menu 7' }] }, { 'desc': 'Menu 2', 'menus': [{ 'desc': 'Menu 6' }, { 'desc': 'Menu 7' }] }, { 'desc': 'Menu 3', 'menus': [{ 'desc': 'Menu 8', 'menus': [{ 'desc': 'Menu 12', 'menus': [{ 'desc': 'Menu 12' }, { 'desc': 'Menu 13', 'menus': [{ 'desc': 'Menu 12' }, { 'desc': 'Menu 13' }] }] }, { 'desc': 'Menu 13' }] }, { 'desc': 'Menu 9' }] }];

    constructor() {

    }

    getClass(menu) {
        if (menu.menus) {
            return "dropdown";
        }
    }

    ngAfterViewInit() {
        jQuery('.dropdown').hover(
            function () {
                jQuery(this).children().children('.sub-menu').slideDown(200);
            },
            function () {
                jQuery(this).children().children('.sub-menu').slideUp(200);
            }
        );

        //jQuery('.dropdown').on('click', function (e) {
        //    //jQuery('.sub-menu').hide();
        //    jQuery(this).children().children('.sub-menu').slideDown(200);
        //    return false;
        //});


        //jQuery('.navbar a.dropdown-toggle').on('click', function (e) {
        //    var $el = jQuery(this);
        //    var $parent = jQuery(this).offsetParent(".dropdown-menu");
        //    jQuery(this).parent("li").toggleClass('open');

        //    if (!$parent.parent().hasClass('nav')) {
        //        $el.next().css({ "top": $el[0].offsetTop, "left": $parent.outerWidth() - 4 });
        //    }

        //    jQuery('.nav li.open').not(jQuery(this).parents("li")).removeClass("open");

        //    return false;
        //});
    }

    ngOnInit() {
    }
}

