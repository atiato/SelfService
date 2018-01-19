import {Component, ViewContainerRef, Input, ViewChild, ReflectiveInjector, ComponentFactoryResolver, Injector} from '@angular/core';

@Component({
    selector: 'my-app',
    template: `
    <div>
      <h2>Lets dynamically create some components!</h2>
      <button (click)="createHelloWorldComponent()">Create Hello World</button>
      <button (click)="createWorldHelloComponent()">Create World Hello</button>
    </div>
    <dynamic-component [componentData]="componentData"></dynamic-component>
  `,
})
export class AppDynamic {
    componentData = null;

    createHelloWorldComponent() {
        this.componentData = {
            component: HelloWorldComponent,
            inputs: {
                showNum: 9
            }
        };
    }

    createWorldHelloComponent() {
        this.componentData = {
            component: WorldHelloComponent,
            inputs: {
                showNum: 2
            }
        };
    }
}

@Component({
    selector: 'dynamic-component',
    entryComponents: [HelloWorldComponent, WorldHelloComponent], // Reference to the components must be here in order to dynamically create them
    template: `<div #dynamicComponentContainer></div>`,
})
export class DynamicComponent {
    currentComponent = null;

    @ViewChild('dynamicComponentContainer', { read: ViewContainerRef }) dynamicComponentContainer: ViewContainerRef;

    // component: Class for the component you want to create
    // inputs: An object with key/value pairs mapped to input name/input value
    @Input() set componentData(data: { component: any, inputs: any }) {
        if (!data) {
            return;
        }

        // Inputs need to be in the following format to be resolved properly
        let inputProviders = Object.keys(data.inputs).map((inputName) => { return { provide: inputName, useValue: data.inputs[inputName] }; });
        let resolvedInputs = ReflectiveInjector.resolve(inputProviders);

        // We create an injector out of the data we want to pass down and this components injector
        let injector = ReflectiveInjector.fromResolvedProviders(resolvedInputs, this.dynamicComponentContainer.parentInjector);

        // We create a factory out of the component we want to create
        let factory = this.resolver.resolveComponentFactory(data.component);

        // We create the component using the factory and the injector
        let component = factory.create(injector);

        // We insert the component into the dom container
        this.dynamicComponentContainer.insert(component.hostView);

        // We can destroy the old component is we like by calling destroy
        if (this.currentComponent) {
            this.currentComponent.destroy();
        }

        this.currentComponent = component;
    }

    constructor(private resolver: ComponentFactoryResolver) {
    }
}

@Component({
    selector: 'hello-world',
    template: `
    <div>Hello World {{showNum}}</div>
  `,
})
export class HelloWorldComponent {
    showNum = 0;

    constructor(private injector: Injector) {
        this.showNum = this.injector.get('showNum');
    }
}

@Component({
    selector: 'world-hello',
    template: `
    <div>World Hello {{showNum}}</div>
  `,
})
export class WorldHelloComponent {
    showNum = 0;

    constructor(private injector: Injector) {
        this.showNum = this.injector.get('showNum');
    }
}
