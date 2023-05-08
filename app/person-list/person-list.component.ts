import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {
  persons: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.persons = [
      { name: "John Doe", weight: 70, bmi: 21.6 },
      { name: "Jane Smith", weight: 65, bmi: 20.1 },
      { name: "Bob Johnson", weight: 80, bmi: 24.7 },
      { name: "Mary Brown", weight: 90, bmi: 27.8 },
      { name: "Tom Davis", weight: 100, bmi: 30.9 },
    ];
    this.persons.forEach(person => {
      person.status = this.getStatus(person.bmi);
      person.color = this.getColor(person.status);
    });
  }

  getStatus(bmi: number): string {
    if (bmi < 18.5) {
      return "Underweight";
    } else if (bmi >= 18.5 && bmi < 25) {
      return "Normal";
    } else if (bmi >= 25 && bmi < 30) {
      return "Overweight";
    } else {
      return "Obese";
    }
  }

  getColor(status: string): string {
    switch (status) {
      case "Underweight":
        return "status-underweight";
      case "Normal":
        return "status-normal";
      case "Overweight":
        return "status-overweight";
      case "Obese":
        return "status-obese";
      default:
        return "";
    }
  }
}
