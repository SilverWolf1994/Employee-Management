import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmpleadosService } from '../../Services/empleados.service';

@Component({
  selector: 'app-create-empleado',
  templateUrl: './create-empleado.component.html',
  styleUrls: ['./create-empleado.component.css']
})
export class CreateEmpleadoComponent implements OnInit {
  createEmpleado: FormGroup;
  submitted = false;
  loading = false;
  id: string | null;
  titulo: string = 'Registrar Empleado';

  constructor(private fb: FormBuilder,
    private _empleadosService: EmpleadosService,
    private router: Router,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute) {

    this.createEmpleado = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      cedula: ['', Validators.required],
      salario: ['', Validators.required]
    });

    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getDataEmpleado();
  }

  submitEmpleado(): void {
    this.submitted = true;

    if(this.createEmpleado.invalid) {
      return
    }

    if(this.id == null) {
      this.registrarEmpleado()
    } else {
      this.actualizarEmpleado(this.id)
    }
  }

  registrarEmpleado(): void {
    const empleado: any = {
      nombres: this.createEmpleado.value.nombres,
      apellidos: this.createEmpleado.value.apellidos,
      cedula: this.createEmpleado.value.cedula,
      salario: this.createEmpleado.value.salario,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    }

    console.log(empleado);
    this.loading = true;

    this._empleadosService.createEmpleado(empleado).then(() => {
      console.log("Empleado registrado en Firestore de Firebase");
      
      this.toastr.success(
        'El empleado ' + empleado['nombres'] + ' se registró correctamente',
        'Registro Exitoso',
        {
          positionClass: 'toast-bottom-right'
        }
      );
      
      this.loading = false;
      this.router.navigate(['/list-empleados']);
    }).catch(error => {
      this.loading = false;
      console.log(error);
    });
  }

  actualizarEmpleado(id: string) {
    const empleado: any = {
      nombres: this.createEmpleado.value.nombres,
      apellidos: this.createEmpleado.value.apellidos,
      cedula: this.createEmpleado.value.cedula,
      salario: this.createEmpleado.value.salario,
      fechaActualizacion: new Date()
    }

    console.log(empleado);
    this.loading = true;

    this._empleadosService.updateEmpleado(id, empleado).then(() => {
      console.log("Empleado actualizado en Firestore de Firebase");
      
      this.toastr.info(
        'El empleado ' + empleado['nombres'] + ' se actualizó correctamente',
        'Actualización Exitosa',
        {
          positionClass: 'toast-bottom-right'
        }
      );

      this.loading = false;
      this.router.navigate(['/list-empleados']);
    }).catch(error => {
      this.loading = false;
      console.log(error);
    });
  }

  getDataEmpleado() {
    if(this.id !== null) {
      this.titulo = 'Actualizar Empleado';

      this.loading = true;
      this._empleadosService.getEmpleado(this.id).subscribe(data => {
        console.log("Cargando datos de empleado:", data.payload.data());
        this.loading = false;
        this.createEmpleado.setValue({
          nombres: data.payload.data()['nombres'],
          apellidos: data.payload.data()['apellidos'],
          cedula: data.payload.data()['cedula'],
          salario: data.payload.data()['salario']
        });
      });
    }
  }

}
