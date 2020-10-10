import { Component, OnInit } from '@angular/core';
import { MenuServiceService } from '../menu-service.service';
import { Items } from '../model/item.model';
import { CustomerInterFace } from '../model/customer.model';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  RiceItem: Items[];
  StatrterItem: Items[];
  Chapatiss: Items[];
  orderForm: FormGroup;
  ricebolean = false;
  starterbool = false;
  chapbool = false;
  toggleMenu = true;
  CustomerOrder: CustomerInterFace;
  selectedItems: Items[];
  total_price: number = 0;
  header: string
  constructor(private getAllMenu: MenuServiceService, private fb: FormBuilder, private _route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getAllMenu.getRiceItems().subscribe((rice) => {
      this.RiceItem = rice;
      this.ricebolean = true;
    },
      (err: any) => console.log(err));

    this.getAllMenu.getStarterItems().subscribe((starter) => {
      this.StatrterItem = starter;
      this.starterbool = true;
    },
      (err: any) => console.log(err));


    this.getAllMenu.getchapatiItems().subscribe((chapati) => {
      this.Chapatiss = chapati;
      this.chapbool = true;
    },
      (err: any) => console.log(err));

    this.orderForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      RiceArray: this.fb.array([]),
      starterArray: this.fb.array([]),
      ChapArray: this.fb.array([])
    });


    this._route.paramMap.subscribe((paramMapd) => {
      const id = +paramMapd.get('id');
      this.decideOfCreateOrEdit(id);
    })


  }

  decideOfCreateOrEdit(custid: number) {
    if (custid === 0) {
      this.header = 'Create Order';
      this.CustomerOrder = {
        id: null,
        Name: '',
        email: '',
        order: [],
        total: null
      }
    }
    else {
      this.header = 'Edit Order';

      this.getAllMenu.getCustomerOrderdetailById(custid).subscribe(
        (CutomerByID) => { this.CustomerOrder = CutomerByID },
        (err: any) => console.log(err)
      );
      setTimeout(() => {

        this.GetAllItem();
        this.orderForm.patchValue({
          name: this.CustomerOrder.Name,
          email: this.CustomerOrder.email,
        });
        this.total_price = this.CustomerOrder.total;
      }, 3000);



    }
  }

  GetAllItem() {
    this.addRice();
    this.toggleMenu = false;
  }



  addRice() {
    this.RiceItem.map(elementi => {
      if (this.CustomerOrder.order.length !== 0) {
        let rice = this.CustomerOrder.order.find(e => e.id === elementi.id);
        if (rice) {
          const controls = this.fb.control(true);
          this.RiceArrayCheck.push(controls);
        } else {
          const controls = this.fb.control(false);
          this.RiceArrayCheck.push(controls);

        }
      } else {
        const controls = this.fb.control(false);
        this.RiceArrayCheck.push(controls);
      }

    });

    this.StatrterItem.map(elementj => {
      if (this.CustomerOrder.order.length !== 0) {
        let st = this.CustomerOrder.order.find(e => e.id === elementj.id);
        if (st) {
          const controls = this.fb.control(true);
          this.StarterArrayCheck.push(controls);
        } else {
          const controls = this.fb.control(false);
          this.StarterArrayCheck.push(controls);

        }
      } else {
        const controls = this.fb.control(false);
        this.StarterArrayCheck.push(controls);
      }
    });

    this.Chapatiss.map(elementk => {
      if (this.CustomerOrder.order.length !== 0) {
        let ch = this.CustomerOrder.order.find(e => e.id === elementk.id);
        if (ch) {
          const controls = this.fb.control(true);
          this.ChapArrayCheck.push(controls);
        } else {
          const controls = this.fb.control(false);
          this.ChapArrayCheck.push(controls);

        }
      } else {
        const controls = this.fb.control(false);
        this.ChapArrayCheck.push(controls);
      }
    });
    this.getSelectedItem();

  }

  get RiceArrayCheck() {
    return <FormArray>this.orderForm.get('RiceArray');
  }
  get StarterArrayCheck() {
    return <FormArray>this.orderForm.get('starterArray');
  }
  get ChapArrayCheck() {
    return <FormArray>this.orderForm.get('ChapArray');
  }

  getSelectedItem() {
    this.selectedItems = [];
    this.RiceArrayCheck.controls.forEach((controls, i) => {
      if (controls.value) {
        this.selectedItems.push(this.RiceItem[i]);
      }
    });
    this.StarterArrayCheck.controls.forEach((controls, i) => {
      if (controls.value) {
        this.selectedItems.push(this.StatrterItem[i]);
      }
    });
    this.ChapArrayCheck.controls.forEach((controls, i) => {
      if (controls.value) {
        this.selectedItems.push(this.Chapatiss[i]);
      }
    });
    this.total_price = 0;
    if (this.selectedItems.length != 0) {
      for (var index in this.selectedItems) {
        this.total_price = this.selectedItems[index].price + this.total_price;
      }
    }
    console.log(this.selectedItems);

  }


  onSubmit1() {
    this.CustomerOrder.Name = this.orderForm.get('name').value;
    this.CustomerOrder.email = this.orderForm.get('email').value;
    this.CustomerOrder.order = this.selectedItems;
    this.CustomerOrder.total = this.total_price;
    console.log(this.CustomerOrder);
    if (this.CustomerOrder.id === null) {
      this.getAllMenu.putCustomer(this.CustomerOrder).subscribe(
        () => { this.router.navigate(['home']); }
      );
    }else{
      this.getAllMenu.updateOrder(this.CustomerOrder).subscribe(
        () => { this.router.navigate(['home']); }
      );
    }


  }


}
