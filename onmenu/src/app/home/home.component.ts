import { Component, OnInit } from '@angular/core';
import { MenuServiceService } from '../menu-service.service';
import { CustomerInterFace } from '../model/customer.model';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  CustomersDetail : CustomerInterFace[];
  surranceDelete = false;
  constructor(private menuSer : MenuServiceService, private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.menuSer.getCustomerOrderdetail().subscribe((custDetail)=>{
      this.CustomersDetail = custDetail;
    },
    (err:any)=> console.log(err))
  }
 

  editOrder(id:number){
    this.router.navigate(['create',id]);
  }

  FinalDelete(id:number){
    this.menuSer.DeleteOrder(id).subscribe(
      ()=> {console.log("deleted")},
      (err:any)=> console.log(err)
    );
      this.router.navigate(['home']);
  }

}
