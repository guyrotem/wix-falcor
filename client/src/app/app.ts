import {Component, bootstrap} from 'angular2/angular2';
@Component({
    selector: 'my-app',
    template: '<h1>{{title}}</h1><h2>{{hero}} details!</h2>'
})

class AppComponent { 
  public title = 'Tour of Heroes';
  public hero = 'Windstorm';
}
bootstrap(AppComponent);