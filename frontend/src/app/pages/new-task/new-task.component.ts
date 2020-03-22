import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Task } from '../../models/task.model'

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {
  listId: string;
  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params)=>{
      this.listId = params['listId'];
     // console.log(params)
    });
  }

  createTask(title: string){
    this.taskService.createTask(title,this.listId).subscribe((task: Task)=>{
      //console.log(task);
      this.router.navigate(['../'],{relativeTo: this.route});
    });
    
  }

}
