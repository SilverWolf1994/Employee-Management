import { Component, OnInit } from '@angular/core';
import { EmpleadosService } from '../../Services/empleados.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-empleados',
  templateUrl: './list-empleados.component.html',
  styleUrls: ['./list-empleados.component.css']
})
export class ListEmpleadosComponent implements OnInit {
  empleados: any[] = []
  loading: boolean = false

  constructor(private _empleadosService: EmpleadosService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getEmpleados();
  }

  getEmpleados(): void {
    this.loading = true

    this._empleadosService.getEmpleados().subscribe(data => {
      this.empleados = [];
      data.forEach((element:any) => {
        console.log(element.payload.doc.id);
        console.log('data: ', element.payload.doc.data());
        this.empleados.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        });
      });
      
      this.loading = false
      console.log(this.empleados);
    });
  }

  deleteEmpleado(id: string) {
    this._empleadosService.deleteEmpleado(id).then(() => {
      console.log("Empleado eliminado exitosamente");

      this.toastr.error(
        'El empleado fue eliminado correctamente',
        'Registro Eliminado',
        {
          positionClass: 'toast-bottom-right'
        }
      );
    }).catch(error => {
      console.log(error);
    });
  }

}
