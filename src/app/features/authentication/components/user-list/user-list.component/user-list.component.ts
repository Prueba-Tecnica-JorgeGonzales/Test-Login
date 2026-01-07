import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {UserService} from '../../../../../shared/services/user.service';
import {AuthService} from '../../../../../shared/services/auth.service';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-user-list.component',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent implements OnInit {

  private userService = inject(UserService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  private fb = inject(FormBuilder);

  users: any[] = [];
  isLoading = true;
  originalUserDat: any = {};

  showModal = false;
  newUserForm: FormGroup;

  constructor() {
    // Inicializamos el formulario con validaciones
    this.newUserForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    this.loadUsers();
  }

  openModal() {
    this.showModal = true;
    this.newUserForm.reset(); // Limpiamos el formulario al abrir
  }

  closeModal() {
    this.showModal = false;
  }

  createUser() {
    if (this.newUserForm.valid) {
      // Reutilizamos el servicio de registro (AuthService)
      this.authService.register(this.newUserForm.value).subscribe({
        next: () => {
          alert('Usuario creado exitosamente');
          this.closeModal();
          this.loadUsers(); // Recargamos la lista para ver al nuevo
        },
        error: (err) => {
          console.error(err);
          alert('Error al crear usuario: ' + (err.error?.message || 'Intenta de nuevo'));
        }
      });
    }
  }



  loadUsers() {
    this.isLoading = true;

    this.userService.getAll().subscribe({
      next: (data) => {
        console.log('1. DATOS CRUDOS:', data);
        const listaSegura = Array.isArray(data) ? data : [];

        this.users = listaSegura.map((user: any) => ({
          ...user,
          isEditing: false
        }));

        console.log('2. TOTAL USUARIOS EN MEMORIA:', this.users.length);

        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error cargando usuarios', err);
        this.isLoading = false;
      }
    });
  }

  startEdit(user: any) {
    this.originalUserDat[user.id] = { ...user };
    user.isEditing = true;
  }

  cancelEdit(user: any) {
    const original = this.originalUserDat[user.id];
    user.username = original.username;
    user.email = original.email;
    user.isEditing = false;
  }

  saveUser(user: any) {
    const updateData = {
      username: user.username,
      email: user.email,
      password: ''
    };

    this.userService.update(user.id, updateData).subscribe({
      next: () => {
        user.isEditing = false;
        alert('Usuario actualizado correctamente');
      },
      error: (err) => {
        alert('Error al actualizar.');
        this.cancelEdit(user);
      }
    });
  }

  deleteUser(id: number) {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      this.userService.delete(id).subscribe(() => {
        this.users = this.users.filter(u => u.id !== id);
        this.cdr.detectChanges();
      });
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
