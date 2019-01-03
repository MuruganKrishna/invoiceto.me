import { Component, OnInit } from "@angular/core";
import * as html2canvas from "html2canvas";
// import { Printd } from "printd";
import * as jsPDF from "jspdf";
declare var $: any;
import {
  FormControl,
  FormArray,
  FormGroupDirective,
  FormBuilder,
  FormGroup,
  NgForm
} from "@angular/forms";

@Component({
  selector: "app-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.css"]
})
export class LayoutComponent implements OnInit {
  description: String;
  price: number = 0;
  quantity: number = 0;
  subtotal: number;
  total: number;
  item: any = [];
  totalVal: number = 0;
  stotal: number;
  ind: number;
  bool: boolean;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    $(".auto-text-area").on("keyup", function() {
      $(this).css("height", "auto");
      $(this).height(this.scrollHeight);
    });

    for (this.ind = 0; this.ind < 3; this.ind++) {
      this.add();
    }
  }
  add(): void {
    //console.log(this.description, this.price, this.quantity);
    let obj = {
      description: this.description,
      price: this.price,
      quantity: this.quantity,
      total: this.quantity * this.price
    };
    this.item.push(obj);

    this.getTotal();
    this.stotal = this.totalVal * 0.2;

    this.description = "";
    this.quantity = 0;
    this.price = 0;
  }
  getTotal() {
    console.log("New Total");
    let i;
    this.totalVal = 0;
    for (i = 0; i < this.item.length; i++) {
      console.log("Getting" + this.item[i].total);
      this.item[i].total = this.item[i].quantity * this.item[i].price;
      this.totalVal = this.item[i].total + this.totalVal;
    }
    this.stotal = this.totalVal * 0.2;
  }
  remove() {
    if (this.item.length > 0) {
      this.item.splice(this.item.length - 1, 1);
    }
    this.getTotal();
  }
  stateChange() {
    this.bool = !this.bool;
  }
  printComponent() {
    let originalContent = document.body.innerHTML;
    let printContent = document.getElementById("invoice").innerHTML;
    debugger;
    let htmlHeader = "<html><head></head><body>";
    let htmlFooter = "</body></html>";
    //printContent += inpText;

    //document.body.innerHTML = printContent;
    // window.document.write(
    //   '<link rel="stylesheet" href="src/app/app.component.css" type="text/css" />'
    // );
    document.body.innerHTML = htmlHeader + printContent + htmlFooter;
    window.print();
    document.body.innerHTML = originalContent;

    // const cssText = ``;

    // const d: Printd = new Printd();

    // // opens the "print dialog" of your browser to print the element
    // d.print(document.getElementById("invoice"), cssText);
  }
  saveContent() {
    const input = document.getElementById("invoice");
    html2canvas(input).then(canvas => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a3");
      pdf.addImage(imgData, "JPEG", 0, 0);
      pdf.save("download.pdf");
    });
  }
}
