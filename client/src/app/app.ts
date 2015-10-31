import {Component, bootstrap} from 'angular2/angular2';

@Component({
    selector: 'my-app',
    template: '<h1 (click)="shwick()">{{title}}</h1><h2>{{hero}} details!</h2>{{banana}}'
})

class AppComponent { 
    falcor: any;
    public title = 'Tour of Heroes';
    public hero = 'Windstorm';
    public banana = '';
    shwick() {
      this.banana = 'shwick';
    };
    
    constructor() {
      var model = new falcor.Model({
        source: new falcor.HttpDataSource('http://localhost:3000/model.json', {
          crossDomain: true
        })
      });

      model.
        get("wixFood").
        then(function(response) {
          this.banana = response.json.wixFood;
        });

      model.
        get("wixFood[0]").
        then(function(response) {
          this.hero = response.json.wixFood[0];
        });
    }
}

bootstrap(AppComponent);