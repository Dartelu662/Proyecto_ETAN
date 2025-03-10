import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { MatStepperModule } from "@angular/material/stepper"
import { MatButtonModule } from "@angular/material/button"
import { MatCardModule } from "@angular/material/card"
import { MatIconModule } from "@angular/material/icon"
import { MatDividerModule } from "@angular/material/divider"
import { MatBadgeModule } from "@angular/material/badge"
import { MatListModule } from "@angular/material/list"
import { MatTooltipModule } from "@angular/material/tooltip"
import { MatChipsModule } from "@angular/material/chips"
import { MatTabsModule } from "@angular/material/tabs"
import { MatTableModule } from "@angular/material/table"
import { MatInputModule } from "@angular/material/input"
import { FormsModule } from "@angular/forms"

interface Student {
  id: number
  name: string
  email: string
  attendance: number
  grade: number
  age: number // Nueva propiedad para la edad
  country: string // Nueva propiedad para el país
}

interface Group {
  id: number
  name: string
  schedule: string
  classroom: string
  subject: string
  students: Student[]
}

interface Teacher {
  id: number
  name: string
  email: string
  department: string
  title: string
  photoUrl: string
  specialties: string[]
  groups: Group[]
}

@Component({
  selector: "app-calificaciones-maestro",
  standalone: true,
  imports: [
    CommonModule,
    MatStepperModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatBadgeModule,
    MatListModule,
    MatTooltipModule,
    MatChipsModule,
    MatTabsModule,
    MatTableModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: "./calificaciones-maestro.component.html",
  styleUrls:  ["./calificaciones-maestro.component.css"],
})
export class CalificacionesMaestroComponent  implements OnInit {
  teacher: Teacher = {
    id: 1,
    name: "Dr. Carlos Rodríguez",
    email: "carlos.rodriguez@universidad.edu",
    department: "Ciencias Computacionales",
    title: "Profesor Titular",
    photoUrl: "https://randomuser.me/api/portraits/men/42.jpg",
    specialties: ["Inteligencia Artificial", "Desarrollo Web", "Bases de Datos"],
    groups: [
      {
        id: 101,
        name: "Grupo A - Programación Avanzada",
        schedule: "Lunes y Miércoles 10:00 - 12:00",
        classroom: "Aula 305",
        subject: "Programación Avanzada",
        students: [
          { id: 1001, name: "Ana García", email: "ana.garcia@universidad.edu", attendance: 95, grade: 88, age: 22, country: "México" },
          { id: 1002, name: "Juan Pérez", email: "juan.perez@universidad.edu", attendance: 85, grade: 76, age: 23, country: "Colombia" },
          { id: 1003, name: "María López", email: "maria.lopez@universidad.edu", attendance: 92, grade: 91, age: 21, country: "España" },
          { id: 1004, name: "Pedro Sánchez", email: "pedro.sanchez@universidad.edu", attendance: 78, grade: 65, age: 24, country: "Argentina" },
          { id: 1005, name: "Laura Martínez", email: "laura.martinez@universidad.edu", attendance: 98, grade: 94, age: 22, country: "Perú" },
        ],
      },
      {
        id: 102,
        name: "Grupo B - Bases de Datos",
        schedule: "Martes y Jueves 14:00 - 16:00",
        classroom: "Laboratorio 2",
        subject: "Bases de Datos",
        students: [
          { id: 2001, name: "Roberto Díaz", email: "roberto.diaz@universidad.edu", attendance: 90, grade: 82 , age: 25, country: "Chile"},
          { id: 2002, name: "Carmen Ruiz", email: "carmen.ruiz@universidad.edu", attendance: 95, grade: 89 , age: 22, country: "México"},
          { id: 2003, name: "José Hernández", email: "jose.hernandez@universidad.edu", attendance: 65, grade: 58, age: 26, country: "Colombia" },
          { id: 2004, name: "Sofía Torres", email: "sofia.torres@universidad.edu", attendance: 88, grade: 75, age: 23, country: "España" },
          { id: 2005, name: "Miguel Flores", email: "miguel.flores@universidad.edu", attendance: 92, grade: 87, age: 24, country: "Argentina" },
          { id: 2006, name: "Elena Castro", email: "elena.castro@universidad.edu", attendance: 75, grade: 68, age: 22, country: "Perú" },
        ],
      },
      {
        id: 103,
        name: "Grupo C - Inteligencia Artificial",
        schedule: "Viernes 9:00 - 13:00",
        classroom: "Aula 401",
        subject: "Inteligencia Artificial",
        students: [
          { id: 3001, name: "Daniel Morales", email: "daniel.morales@universidad.edu", attendance: 97, grade: 95, age: 21, country: "México" },
          { id: 3002, name: "Patricia Vargas", email: "patricia.vargas@universidad.edu", attendance: 85, grade: 79, age: 22, country: "Chile"  },
          { id: 3003, name: "Fernando Ortiz", email: "fernando.ortiz@universidad.edu", attendance: 72, grade: 62 , age: 23, country: "Colombia"},
          { id: 3004, name: "Gabriela Núñez", email: "gabriela.nunez@universidad.edu", attendance: 93, grade: 88, age: 24, country: "España"  },
        ],
      },
    ],
  }

  selectedGroup: Group | null = null
  displayedColumns: string[] = ["name", "date", "grade"]
  currentDate: Date = new Date()

  constructor() {}

  ngOnInit(): void {}

  selectGroup(group: Group, stepper: any, index: number): void {
    this.selectedGroup = group
    stepper.selectedIndex = index
  }

  goToTeacherInfo(stepper: any): void {
    stepper.selectedIndex = 0
  }

  calculateAverage(students: Student[], property: "grade" | "attendance"): number {
    if (!students || students.length === 0) return 0
    const sum = students.reduce((acc, student) => acc + student[property], 0)
    return sum / students.length
  }

  saveGrades(): void {
    if (this.selectedGroup) {
      console.log("Calificaciones guardadas para", this.selectedGroup.name)
      console.log(this.selectedGroup.students)
      // Aquí iría la lógica para guardar las calificaciones en el backend
    }
  }
}

