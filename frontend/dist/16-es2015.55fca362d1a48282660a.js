(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{"+P1L":function(e,t,n){"use strict";n.r(t);var r=n("3Pt+"),a=n("RS3s"),o=n("vTDv"),s=n("tyNb"),i=n("fXoL");let l=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=i["\u0275\u0275defineComponent"]({type:e,selectors:[["ngx-users"]],decls:1,vars:0,template:function(e,t){1&e&&i["\u0275\u0275element"](0,"router-outlet")},directives:[s.h],encapsulation:2}),e})();var m=n("HDdC"),d=n("XNiG"),u=n("1G5W"),h=n("2NI8"),c=n("Cgdg"),g=n("McNs"),p=n("dwCd"),b=n("aceb"),f=n("6edl"),C=function(e){return e.VIEW="View",e.EDIT="Edit",e.ADD="Add",e.EDIT_SELF="EditSelf",e}({});let w=(()=>{class e{constructor(e,t,n,r,a,o,s){this.usersService=e,this.router=t,this.route=n,this.tokenService=r,this.userStore=a,this.toasterService=o,this.fb=s,this.unsubscribe$=new d.a}get firstName(){return this.userForm.get("firstName")}get lastName(){return this.userForm.get("lastName")}get login(){return this.userForm.get("login")}get email(){return this.userForm.get("email")}get age(){return this.userForm.get("age")}get street(){return this.userForm.get("address").get("street")}get city(){return this.userForm.get("address").get("city")}get zipCode(){return this.userForm.get("address").get("zipCode")}setViewMode(e){this.mode=e}ngOnInit(){this.initUserForm(),this.loadUserData()}initUserForm(){this.userForm=this.fb.group({id:this.fb.control(""),role:this.fb.control(""),firstName:this.fb.control("",[r.z.minLength(3),r.z.maxLength(20)]),lastName:this.fb.control("",[r.z.minLength(3),r.z.maxLength(20)]),login:this.fb.control("",[r.z.required,r.z.minLength(6),r.z.maxLength(20)]),age:this.fb.control("",[r.z.required,r.z.min(1),r.z.max(120),r.z.pattern(c.b)]),email:this.fb.control("",[r.z.required,r.z.pattern(c.a)]),address:this.fb.group({street:this.fb.control(""),city:this.fb.control(""),zipCode:this.fb.control("")})})}get canEdit(){return this.mode!==C.VIEW}loadUserData(){const e=this.route.snapshot.paramMap.get("id");if(this.route.snapshot.queryParamMap.get("profile"))this.setViewMode(C.EDIT_SELF),this.loadUser();else if(e){const t=this.userStore.getUser().id;this.setViewMode(t.toString()===e?C.EDIT_SELF:C.EDIT),this.loadUser(e)}else this.setViewMode(C.ADD)}loadUser(e){(this.mode===C.EDIT_SELF?this.usersService.getCurrentUser():this.usersService.get(e)).pipe(Object(u.a)(this.unsubscribe$)).subscribe(e=>{this.userForm.setValue({id:e.id?e.id:"",role:e.role?e.role:"",firstName:e.firstName?e.firstName:"",lastName:e.lastName?e.lastName:"",login:e.login?e.login:"",age:e.age?e.age:"",email:e.email,address:{street:e.address&&e.address.street?e.address.street:"",city:e.address&&e.address.city?e.address.city:"",zipCode:e.address&&e.address.zipCode?e.address.zipCode:""}})})}convertToUser(e){return e}save(){const e=this.convertToUser(this.userForm.value);let t=new m.a;this.mode===C.EDIT_SELF?this.usersService.updateCurrent(e).subscribe(e=>{this.tokenService.set(new g.f(e,"email",new Date)),this.handleSuccessResponse()},e=>{this.handleWrongResponse()}):t=e.id?this.usersService.update(e):this.usersService.create(e),t.pipe(Object(u.a)(this.unsubscribe$)).subscribe(()=>{this.handleSuccessResponse()},e=>{this.handleWrongResponse()})}handleSuccessResponse(){this.toasterService.success("",`Item ${this.mode===C.ADD?"created":"updated"}!`),this.back()}handleWrongResponse(){this.toasterService.danger("","This email has already taken!")}back(){this.router.navigate(["/pages"])}ngOnDestroy(){this.unsubscribe$.next(),this.unsubscribe$.complete()}}return e.\u0275fac=function(t){return new(t||e)(i["\u0275\u0275directiveInject"](h.a),i["\u0275\u0275directiveInject"](s.c),i["\u0275\u0275directiveInject"](s.a),i["\u0275\u0275directiveInject"](g.j),i["\u0275\u0275directiveInject"](p.a),i["\u0275\u0275directiveInject"](b.dc),i["\u0275\u0275directiveInject"](r.d))},e.\u0275cmp=i["\u0275\u0275defineComponent"]({type:e,selectors:[["ngx-user"]],decls:47,vars:21,consts:[[1,"container",3,"formGroup"],[1,"form-group"],["for","firstName"],["nbInput","","id","firstName","formControlName","firstName","placeholder","Last Name",1,"form-control",3,"status"],["label","First Name","minLength","3","maxLength","20",3,"showMinLength","showMaxLength"],["for","lastName"],["nbInput","","id","lastName","formControlName","lastName","placeholder","Last Name",1,"form-control",3,"status"],["label","Last Name","minLength","3","maxLength","20",3,"showMinLength","showMaxLength"],["for","inputLogin"],["nbInput","","id","inputLogin","formControlName","login","placeholder","Login",1,"form-control",3,"status"],["label","Login","minLength","6","maxLength","20",3,"showMinLength","showMaxLength","showRequired"],["for","inputAge"],["nbInput","","id","inputAge","formControlName","age","placeholder","Age",1,"form-control",3,"status"],["label","Age","min","1","max","120",3,"showMin","showMax","showRequired","showPattern"],["for","inputEmail"],["nbInput","","id","inputEmail","formControlName","email","placeholder","Email",1,"form-control",3,"status"],["label","Email","min","1","max","120",3,"showPattern","showRequired"],["formGroupName","address",1,"form-group"],["for","inputStreet"],["nbInput","","id","inputStreet","placeholder","Street","formControlName","street",1,"form-control"],["for","inputCity"],["nbInput","","id","inputCity","placeholder","City","formControlName","city",1,"form-control"],["for","inputZipCode"],["nbInput","","id","inputZipCode","placeholder","Zip Code","formControlName","zipCode",1,"form-control"],["nbButton","","status","primary","hero","",3,"disabled","click"],["nbButton","","status","info","hero","",3,"click"]],template:function(e,t){1&e&&(i["\u0275\u0275elementStart"](0,"nb-card"),i["\u0275\u0275elementStart"](1,"nb-card-header"),i["\u0275\u0275text"](2),i["\u0275\u0275elementEnd"](),i["\u0275\u0275elementStart"](3,"nb-card-body"),i["\u0275\u0275elementStart"](4,"div",0),i["\u0275\u0275elementStart"](5,"div",1),i["\u0275\u0275elementStart"](6,"label",2),i["\u0275\u0275text"](7,"First Name"),i["\u0275\u0275elementEnd"](),i["\u0275\u0275element"](8,"input",3),i["\u0275\u0275element"](9,"ngx-validation-message",4),i["\u0275\u0275elementEnd"](),i["\u0275\u0275elementStart"](10,"div",1),i["\u0275\u0275elementStart"](11,"label",5),i["\u0275\u0275text"](12,"Last Name"),i["\u0275\u0275elementEnd"](),i["\u0275\u0275element"](13,"input",6),i["\u0275\u0275element"](14,"ngx-validation-message",7),i["\u0275\u0275elementEnd"](),i["\u0275\u0275elementStart"](15,"div",1),i["\u0275\u0275elementStart"](16,"label",8),i["\u0275\u0275text"](17,"Login"),i["\u0275\u0275elementEnd"](),i["\u0275\u0275element"](18,"input",9),i["\u0275\u0275element"](19,"ngx-validation-message",10),i["\u0275\u0275elementEnd"](),i["\u0275\u0275elementStart"](20,"div",1),i["\u0275\u0275elementStart"](21,"label",11),i["\u0275\u0275text"](22,"Age"),i["\u0275\u0275elementEnd"](),i["\u0275\u0275element"](23,"input",12),i["\u0275\u0275element"](24,"ngx-validation-message",13),i["\u0275\u0275elementEnd"](),i["\u0275\u0275elementStart"](25,"div",1),i["\u0275\u0275elementStart"](26,"label",14),i["\u0275\u0275text"](27,"Email"),i["\u0275\u0275elementEnd"](),i["\u0275\u0275element"](28,"input",15),i["\u0275\u0275element"](29,"ngx-validation-message",16),i["\u0275\u0275elementEnd"](),i["\u0275\u0275elementStart"](30,"div",17),i["\u0275\u0275elementStart"](31,"label",18),i["\u0275\u0275text"](32,"Street"),i["\u0275\u0275elementEnd"](),i["\u0275\u0275element"](33,"input",19),i["\u0275\u0275elementEnd"](),i["\u0275\u0275elementStart"](34,"div",17),i["\u0275\u0275elementStart"](35,"label",20),i["\u0275\u0275text"](36,"City"),i["\u0275\u0275elementEnd"](),i["\u0275\u0275element"](37,"input",21),i["\u0275\u0275elementEnd"](),i["\u0275\u0275elementStart"](38,"div",17),i["\u0275\u0275elementStart"](39,"label",22),i["\u0275\u0275text"](40,"Zip Code"),i["\u0275\u0275elementEnd"](),i["\u0275\u0275element"](41,"input",23),i["\u0275\u0275elementEnd"](),i["\u0275\u0275elementEnd"](),i["\u0275\u0275elementEnd"](),i["\u0275\u0275elementStart"](42,"nb-card-footer"),i["\u0275\u0275elementStart"](43,"button",24),i["\u0275\u0275listener"]("click",(function(){return t.save()})),i["\u0275\u0275text"](44,"Submit"),i["\u0275\u0275elementEnd"](),i["\u0275\u0275elementStart"](45,"button",25),i["\u0275\u0275listener"]("click",(function(){return t.back()})),i["\u0275\u0275text"](46,"Back"),i["\u0275\u0275elementEnd"](),i["\u0275\u0275elementEnd"](),i["\u0275\u0275elementEnd"]()),2&e&&(i["\u0275\u0275advance"](2),i["\u0275\u0275textInterpolate1"]("",t.mode," user"),i["\u0275\u0275advance"](2),i["\u0275\u0275property"]("formGroup",t.userForm),i["\u0275\u0275advance"](4),i["\u0275\u0275property"]("status",null!=t.firstName&&t.firstName.hasError("minlength")||null!=t.firstName&&t.firstName.hasError("maxlength")?"danger":"primary"),i["\u0275\u0275advance"](1),i["\u0275\u0275property"]("showMinLength",null==t.firstName?null:t.firstName.hasError("minlength"))("showMaxLength",null==t.firstName?null:t.firstName.hasError("maxlength")),i["\u0275\u0275advance"](4),i["\u0275\u0275property"]("status",null!=t.lastName&&t.lastName.hasError("minlength")||null!=t.lastName&&t.lastName.hasError("maxlength")?"danger":"primary"),i["\u0275\u0275advance"](1),i["\u0275\u0275property"]("showMinLength",null==t.lastName?null:t.lastName.hasError("minlength"))("showMaxLength",null==t.lastName?null:t.lastName.hasError("maxlength")),i["\u0275\u0275advance"](4),i["\u0275\u0275property"]("status",(null!=t.login&&null!=t.login.errors&&t.login.errors.required||null!=t.login&&t.login.hasError("minlength")||null!=t.login&&t.login.hasError("maxlength"))&&t.login.touched?"danger":"primary"),i["\u0275\u0275advance"](1),i["\u0275\u0275property"]("showMinLength",null==t.login?null:t.login.hasError("minlength"))("showMaxLength",null==t.login?null:t.login.hasError("maxlength"))("showRequired",(null==t.login?null:null==t.login.errors?null:t.login.errors.required)&&t.login.touched),i["\u0275\u0275advance"](4),i["\u0275\u0275property"]("status",(null!=t.age&&null!=t.age.errors&&t.age.errors.required||null!=t.age&&null!=t.age.errors&&t.age.errors.min||null!=t.age&&null!=t.age.errors&&t.age.errors.max||null!=t.age&&t.age.hasError("pattern"))&&t.age.touched?"danger":"primary"),i["\u0275\u0275advance"](1),i["\u0275\u0275property"]("showMin",(null==t.age?null:null==t.age.errors?null:t.age.errors.min)&&t.age.touched)("showMax",(null==t.age?null:null==t.age.errors?null:t.age.errors.max)&&t.age.touched)("showRequired",(null==t.age?null:null==t.age.errors?null:t.age.errors.required)&&t.age.touched)("showPattern",null==t.age?null:t.age.hasError("pattern")),i["\u0275\u0275advance"](4),i["\u0275\u0275property"]("status",(null!=t.email&&null!=t.email.errors&&t.email.errors.required||null!=t.email&&t.email.hasError("pattern"))&&t.email.touched?"danger":"primary"),i["\u0275\u0275advance"](1),i["\u0275\u0275property"]("showPattern",(null==t.email?null:t.email.hasError("pattern"))&&t.email.touched)("showRequired",(null==t.email?null:null==t.email.errors?null:t.email.errors.required)&&t.email.touched),i["\u0275\u0275advance"](14),i["\u0275\u0275property"]("disabled",!t.userForm.valid))},directives:[b.B,b.D,b.A,r.q,r.h,b.cb,r.b,r.p,r.g,f.a,r.i,b.C,b.p],styles:["[_nghost-%COMP%]     cdk-global-scrollblock{position:null;width:null;overflow-y:null}[_nghost-%COMP%]     .cdk-global-scrollblock{position:static!important}.nb-theme-default   [_nghost-%COMP%]   button[nbButton][_ngcontent-%COMP%]{margin:.25rem}.nb-theme-default   [_nghost-%COMP%]   .container[_ngcontent-%COMP%]{display:-webkit-box;display:flex;flex-wrap:wrap;justify-content:space-around}.nb-theme-default   [_nghost-%COMP%]   input[_ngcontent-%COMP%]{width:20rem}[dir=ltr]   .nb-theme-default   [_nghost-%COMP%]   -shadowcsshost   button[_ngcontent-%COMP%]{margin:0 .75rem 0 0}[dir=rtl]   .nb-theme-default   [_nghost-%COMP%]   -shadowcsshost   button[_ngcontent-%COMP%]{margin:0 0 0 .75rem}.nb-theme-dark   [_nghost-%COMP%]   button[nbButton][_ngcontent-%COMP%]{margin:.25rem}.nb-theme-dark   [_nghost-%COMP%]   .container[_ngcontent-%COMP%]{display:-webkit-box;display:flex;flex-wrap:wrap;justify-content:space-around}.nb-theme-dark   [_nghost-%COMP%]   input[_ngcontent-%COMP%]{width:20rem}[dir=ltr]   .nb-theme-dark   [_nghost-%COMP%]   -shadowcsshost   button[_ngcontent-%COMP%]{margin:0 .75rem 0 0}[dir=rtl]   .nb-theme-dark   [_nghost-%COMP%]   -shadowcsshost   button[_ngcontent-%COMP%]{margin:0 0 0 .75rem}.nb-theme-cosmic   [_nghost-%COMP%]   button[nbButton][_ngcontent-%COMP%]{margin:.25rem}.nb-theme-cosmic   [_nghost-%COMP%]   .container[_ngcontent-%COMP%]{display:-webkit-box;display:flex;flex-wrap:wrap;justify-content:space-around}.nb-theme-cosmic   [_nghost-%COMP%]   input[_ngcontent-%COMP%]{width:20rem}[dir=ltr]   .nb-theme-cosmic   [_nghost-%COMP%]   -shadowcsshost   button[_ngcontent-%COMP%]{margin:0 .75rem 0 0}[dir=rtl]   .nb-theme-cosmic   [_nghost-%COMP%]   -shadowcsshost   button[_ngcontent-%COMP%]{margin:0 0 0 .75rem}.nb-theme-corporate   [_nghost-%COMP%]   button[nbButton][_ngcontent-%COMP%]{margin:.25rem}.nb-theme-corporate   [_nghost-%COMP%]   .container[_ngcontent-%COMP%]{display:-webkit-box;display:flex;flex-wrap:wrap;justify-content:space-around}.nb-theme-corporate   [_nghost-%COMP%]   input[_ngcontent-%COMP%]{width:20rem}[dir=ltr]   .nb-theme-corporate   [_nghost-%COMP%]   -shadowcsshost   button[_ngcontent-%COMP%]{margin:0 .75rem 0 0}[dir=rtl]   .nb-theme-corporate   [_nghost-%COMP%]   -shadowcsshost   button[_ngcontent-%COMP%]{margin:0 0 0 .75rem}"]}),e})();var M=n("pfsP");const v=[{path:"",component:l,children:[{path:"edit/:id",canActivate:[M.a],component:w},{path:"current",component:w},{path:"add",canActivate:[M.a],component:w}]}];let E=(()=>{class e{}return e.\u0275mod=i["\u0275\u0275defineNgModule"]({type:e}),e.\u0275inj=i["\u0275\u0275defineInjector"]({factory:function(t){return new(t||e)},imports:[[s.g.forChild(v)],s.g]}),e})();var x=n("gcnP"),N=n("h+2I");n.d(t,"UsersModule",(function(){return S}));const y=[b.m,b.q,b.E,b.db,b.Zb,b.uc,b.Ab,b.Ib,b.nb,b.ab,b.Qb,b.R,b.db];let S=(()=>{class e{}return e.\u0275mod=i["\u0275\u0275defineNgModule"]({type:e}),e.\u0275inj=i["\u0275\u0275defineInjector"]({factory:function(t){return new(t||e)},providers:[],imports:[[o.a,x.AuthModule,a.d,E,N.a,r.w,...y]]}),e})()}}]);