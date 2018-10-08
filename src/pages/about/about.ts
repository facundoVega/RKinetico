import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import firebase from 'firebase';
import {AuthService } from '../../services/auth.service.';
import { HomePage } from '../home/home';
/*LO QUE TENGO QUE HACER ES TRAERR TOOOODO LO DE LA BASE DE DATOS RELEVAMIENTO CARGAR DOS ARRAYS
UNO CON COSAS LINDAS Y OTRO CON COSAS FEAS, PARA LUEGO PASARSELO A LOS METODOS QUE CONSTRUYEN 
LOS GRAFICOS CUANDO EL OBSERVABLE SE TERMINA DE EJECUTAR*/
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  // @ViewChild('barCanvas') barCanvas;
   //@ViewChild('doughnutCanvas') doughnutCanvas;
 
   
   public barChartOptions:any = {
    scaleShowVerticalLines: true,
    responsive: true,
    scales:{
        yAxes: [{
            ticks: {
                beginAtZero:true
            }
        }]
    }
  };
  public barChartLabels:string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
  
  public barChartData:any[] = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Votos'}
  
  ];
  public doughnutChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData:number[] = [350, 450, 100];
  public doughnutChartType:string = 'doughnut';
    dondeEstoy;
    fotos:any[] = [];
    fotosFeas:any[] =[];
    votos:any[] =[];
    votosFeas:any = [];
    misLabelsFeos:string[]=[];
      barChart: any;
      doughnutChart: any;
      lineChart: any;
      coloresLindas:string[]=[];
      coloresFeas:string[]=[];
    mostrarTorta:boolean;
    mostrarBarra:boolean;
  misLabels:string[]=[];
  mostrarImagen=false;
imagen;
      
    
   //public barChartData:any[];
     // public barChartLabels:any[]; 
     // public barChartData:any[];
     // public barChartType:string;
  constructor(public navCtrl: NavController, private navP:NavParams, private auth:AuthService) {

this.mostrarImagen=false;
   this.dondeEstoy = this.navP.get("lugar");
   if(this.dondeEstoy =="cosasLindas")
    {
        this.TraerFotos();
       
        this.mostrarBarra =true;
        this.mostrarTorta=false;
    }
    else
    {
        this.TraerFotosFeas(); 
        this.mostrarTorta =true;
        this.mostrarBarra=false;
    }
   

  }


  ionViewDidLoad() {
  
   
 /*   if(this.dondeEstoy =="cosasLindas")
    {


        this.barChart = new Chart(this.barCanvas.nativeElement, {

            type: 'bar',
            data: {
                labels: this.votos,
                datasets: [{
                    label: 'votos',
                    data: this.votos,
                    backgroundColor:this.coloresLindas,
                       
                    
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
              labels:{
                fontColor:'#fff'
                
              },
         
             
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
  
        });
    }
    else
    {
        this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {

            type: 'doughnut',
            data: {
                labels: this.votosFeas,
                datasets: [{
                    label: '# of Votes',
                    data: this.votosFeas,
                    backgroundColor:this.coloresFeas,
                    hoverBackgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56",
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56"
                    ]
                }]
            }
  
        });
    }*/
}  
     traerColor(){
        let long=6;
        var caracteres = "0123456789ABCDEF";
        var color = "";
        for (let i=0; i<long; i++) color += caracteres.charAt(Math.floor(Math.random()*caracteres.length));
        color="#"+color;
        return color;
    }

  
  TraerFotos()
  {
      let mensaje = firebase.database().ref().child("cosasLindas");
      mensaje.once("value",(snap)=>{
  
        var data= snap.val();
       this.fotos =[];
       this.votos =[];
        for(var key in data)
        {
          this.fotos.push(data[key]);
         
          this.votos.push(this.fotos[this.fotos.length-1].valor.votos);
         
            this.coloresLindas.push(this.traerColor());
            this.fotos[this.fotos.length-1].valor.color="border:3px solid "+this.coloresLindas[this.coloresLindas.length-1];
            console.log(this.fotos[this.fotos.length-1].valor.color);
            this.misLabels.push(" ");
        }
        console.log(this.fotos);
       console.log("Se ejecuta en cosas lindas");
        this.barChartData[0].data = this.votos;
        this.barChartLabels = this.misLabels;
      });
  }
 

  TraerFotosFeas()
  {
      let mensaje = firebase.database().ref().child("cosasFeas");
      mensaje.once("value",(snap)=>{
  
        var data= snap.val();
       this.fotosFeas =[];
       this.votosFeas =[];
        for(var key in data)
        {
          this.fotosFeas.push(data[key]);
         
          this.votosFeas.push(this.fotosFeas[this.fotosFeas.length-1].valor.votos);
            this.coloresFeas.push(this.traerColor());
          
        }
      this.doughnutChartData = this.votosFeas;
        this.doughnutChartLabels = this.votosFeas;
        console.log("se ejecuta en fotos feas");

        
      });
    }
public chartClicked(e:any)
{
  try
  {
  if(this.dondeEstoy =="cosasLindas")
  {
    this.imagen = this.fotos[e.active[0]._index].valor.foto;
    this.mostrarImagen=true;
    }
    else
    {  
        
        this.imagen = this.fotosFeas[e.active[0]._index].valor.foto;
        this.mostrarImagen=true;
    }
    }
    catch(err)
    { }
}
IrAtrasPag()
{
    this.navCtrl.pop();
}
Logout()
{
  (window.document.querySelector('.alertAbout') as HTMLElement).style.display= "flex";
/* if(this.cerrarSesion == true)
  {
    this.auth.signOut();
    this.nav.setRoot(HomePage);
  }
  else
  {
    (window.document.querySelector('.alert') as HTMLElement).style.display= "none";
  }*/

    

}
SetearCerrar(valor)
{
  console.log(valor);
  if(valor == "aceptar")
  {
    this.auth.signOut();
    this.navCtrl.setRoot(HomePage);
  }
  else
  {
    (window.document.querySelector('.alertAbout') as HTMLElement).style.display= "none";
  }
}
 /* CargarBarras()
  {
    this.barChart = new Chart(this.barCanvas.nativeElement, {

      type: 'bar',
      data: {
          labels: this.votos,
          datasets: [{
              label: 'votos',
              data: this.votos,
              backgroundColor:'rgba(255, 99, 132, 0.2)',
                 
              
              borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
        labels:{
          fontColor:'#fff'
          
        },
   
        events: ['chartClicked'],
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }]
          }
      }

  });
  }
  CargarTorta()
  {
    this.barChart = new Chart(this.barCanvas.nativeElement, {

      type: 'bar',
      data: {
          labels: this.votos,
          datasets: [{
              label: 'votos',
              data: this.votos,
              backgroundColor:'rgba(255, 99, 132, 0.2)',
                 
              
              borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
        labels:{
          fontColor:'#fff'
          
        },
   
        events: ['chartClicked'],
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }]
          }
      }

  });
  }*/
}

