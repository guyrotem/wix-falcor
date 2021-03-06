var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var angular2_1 = require('angular2/angular2');
var AppComponent = (function () {
    function AppComponent() {
        this.title = 'Tour of Heroes';
        this.hero = 'Windstorm';
        this.banana = '';
        var model = new falcor.Model({
            source: new falcor.HttpDataSource('http://localhost:3000/model.json', {
                crossDomain: true
            })
        });
        model.
            get("wixFood").
            then(function (response) {
            this.banana = response.json.wixFood;
        });
        model.
            get("wixFood[0]").
            then(function (response) {
            this.hero = response.json.wixFood[0];
        });
    }
    AppComponent.prototype.shwick = function () {
        this.banana = 'shwick';
    };
    ;
    AppComponent = __decorate([
        angular2_1.Component({
            selector: 'my-app',
            template: '<h1 (click)="shwick()">{{title}}</h1><h2>{{hero}} details!</h2>{{banana}}'
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
})();
angular2_1.bootstrap(AppComponent);
//# sourceMappingURL=app.js.map