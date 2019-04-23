import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  titulo:string;
  autor:string;
  description:string;

  constructor( private router:Router,
                public title:Title,
                public meta:Meta ) {
   this.getDataRouter().subscribe( data =>{
        // console.log(data);
        this.titulo = data.titulo;
        this.autor = data.autor;
        this.description = data.description;

      //personalizacion en la ventana del buscador => ijectado se angular platform brouser
      //titulo
      this.title.setTitle( this.titulo );
      // meta description
      const metaTAg:MetaDefinition ={
        name: this.titulo,
        content: this.description,
        auth: this.autor
      };

      this.meta.updateTag( metaTAg );
    
      // meta autor

    })
   }

  ngOnInit() {
  }

  getDataRouter(){
    return  this.router.events.pipe(
      filter( evento => evento instanceof ActivationEnd ),
      filter( (evento:ActivationEnd) => evento.snapshot.firstChild === null ),
      map( (evento:ActivationEnd) => evento.snapshot.data ) )

  }

}
