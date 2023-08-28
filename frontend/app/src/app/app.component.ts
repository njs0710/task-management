import { Component,ElementRef, ViewChild , OnInit,HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {
  tasks: any[] = [];
  visibleTasks:any[] = [];

  newTaskName: string = '';
  newTaskPriority = 'NORMAL';

  prioritiesMap: any = {
    "URGENT":{index:0},
    "NORMAL":{index:1},
    "LOW":{index:2}
  }
  prioritiesList: any = ["URGENT","NORMAL","LOW"]


  info: string = '';

  editingTasks = new Map<number, boolean>();


  filterTasks = "ALL";
  sortTasks  ="DATEADDED";

  toogleTaskPriorityTimeout:any;
  @ViewChild('editTask') editTask: ElementRef; 
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchTasks();
    
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    //task: add keyboard support
  }
  
	onPrioritySelected(value:string): void {
		this.newTaskPriority = value;
	}

  onFilterSelected(value:string): void {
		this.filterTasks = value;
    this.updateVisibleTasks();
	}
  onSortOrderSelected(value:string): void {
		this.sortTasks = value;
    this.updateVisibleTasks();
	}
  
  startEditing(task: any) {
    this.editingTasks = new Map<number, boolean>();
    this.editingTasks.set(task.id, true);
    setTimeout(()=>{
      this.editTask.nativeElement.select();
    })
    
  }

  filterVisibleTasks(){
    this.visibleTasks= this.tasks.filter((task)=>{
      var visible = true;
      switch(	this.filterTasks) {
          case "ALL":
            visible = true;
            break;
          case "ACTIVE":
          visible = !task.done;
          break;
        case "COMPLETED":
          visible = task.done;
          break;
        case "URGENT":
        case "NORMAL":
        case "LOW":
          visible = task.priority===this.filterTasks;
          break;
        default:
          visible = true;
      }
      return visible;
    });
  }

  sortVisibleTasks(){
    if(this.sortTasks=== "PRIORITY"){
      this.visibleTasks = this.visibleTasks.sort((aTask, bTask) => {

        var aTaskPrio = this.prioritiesMap[aTask.priority].index;
        var bTaskPrio = this.prioritiesMap[bTask.priority].index;


        if (aTaskPrio > bTaskPrio) {
          return 1;
        } else if (aTaskPrio < bTaskPrio) {
          return -1;
        }
        return 0;
      })
    }
  }

  updateVisibleTasks(){
    this.filterVisibleTasks();
    this.sortVisibleTasks();
  }

  updateTask(task: any) {
    this.http.put(`http://localhost:8080/api/tasks/${task.id}`, task).subscribe(() => {
      this.editingTasks.delete(task.id);
      this.fetchTasks();
    });
  }

  isEditing(task: any): boolean {
    return this.editingTasks.get(task.id) || false;
  }

  fetchTasks(): void {
    this.http.get<any[]>('http://localhost:8080/api/tasks').subscribe((tasks) => {

      tasks.forEach(task=>{
        task.info = typeof task.created;
      })
      this.tasks = tasks;
      this.updateVisibleTasks();
    });
  }

  createTask(): void {
    if (this.newTaskName.trim() !== '') {
      this.http
        .post('http://localhost:8080/api/tasks', { name: this.newTaskName,priority:this.newTaskPriority,created: Math.floor( new Date().getTime() / 1000), done: false })
        .subscribe(() => {
          setTimeout(()=>{this.fetchTasks()});
          this.newTaskName = '';
        });
    }
  }

  saveTaskStatus(task: any): void {
    this.http.put('http://localhost:8080/api/tasks/'+task.id, task).subscribe(() => {
      setTimeout(()=>{this.fetchTasks()});
    });
  }

  toogleTaskPriority(task: any):void{
    this.editingTasks = new Map<number, boolean>();
    var oldPriority = this.prioritiesMap[task.priority].index;
    task.priority = this.prioritiesList[(oldPriority+1)%this.prioritiesList.length];
    
    if(this.sortTasks=== "PRIORITY" || this.filterTasks === "URGENT"  || this.filterTasks === "NORMAL"  || this.filterTasks === "LOW"){
      if(this.toogleTaskPriorityTimeout){
        clearTimeout(this.toogleTaskPriorityTimeout);
      }
      this.toogleTaskPriorityTimeout = setTimeout(()=>{
        this.toogleTaskPriorityTimeout = null;
        this.saveTaskStatus(task);
      },2000);

    }
    else{
      this.toogleTaskPriorityTimeout = null;
      this.saveTaskStatus(task);
    }
    
  }

  deleteTask(task: any): void {
    this.http.delete('http://localhost:8080/api/tasks/'+task.id).subscribe(() => {
      setTimeout(()=>{this.fetchTasks()});
    });
  }
}