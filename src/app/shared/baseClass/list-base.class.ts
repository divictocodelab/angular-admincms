import { OnInit, OnDestroy } from "@angular/core";
import { ServiceBase } from "../../shared/baseClass/services-base.class";
import { Subscription, TimeoutError } from "rxjs";
import { sumObjectsByKey } from "../../shared/services/utility-function.service";
import { ToasterService } from '../services/toaster.service';

export class ManageListBase implements OnInit, OnDestroy {
  hydrationUrl: string;

  dataList: Array<any>;

  dataListCount: number;

  page: number;

  loading: boolean;

  totalQueryableData: number;

  observableSubscriptions: Array<Subscription>;

  query: any;

  dataDetails: any;

  constructor(private url: string, protected serviceBase: ServiceBase, protected toasterService: ToasterService) {
    this.hydrationUrl = url;
    this.page = 1;
    this.query = "";
    this.loading = false;
    this.dataList = [];
    this.dataDetails = {};
    this.dataListCount = 0;
    this.totalQueryableData = 0;
    this.observableSubscriptions = [];
  }

  ngOnInit() {
    if (this.hydrationUrl !== "") {
      this.getList(this.page);
    }
  }

  getList(page: number, queryObj?) {
    if (queryObj) {
      this.query = queryObj;
    }

    this.loading = true;
    const getListSubscription = this.serviceBase.getList(this.hydrationUrl, page, this.query).subscribe({
      next: (result: any) => {
        this.dataList = this.dataList.concat(result.data.rows); // for data listing array
        this.dataDetails = sumObjectsByKey(this.dataDetails, result.data.details); // for data details object

        this.totalQueryableData = result.data.total;
        this.dataListCount = this.dataList.length;
        this.page = page;
        this.loading = false;
      },
      error: err => {
        if (err instanceof TimeoutError) {
          this.toasterService.Error("", "Timeout Error");
        }
        this.loading = false;
      }
    });
    this.observableSubscriptions.push(getListSubscription);
  }

  setStatus(status: string) {
    let state;
    switch (status) {
      case "active":
        state = true;
        break;

      case "inactive":
        state = false;
        break;

      default:
        state = false;
        break;
    }
    return state;
  }

  updateUsersStatus(url: string, id: number, status: string) {
    if (status === "inactive") {
      const data = !confirm("Are you sure you want to deactivate it");
      if (data) {
        return;
      }
    }

    const indexToBeChanged = this.dataList.findIndex(entity => entity.id === id);
    if (this.dataList[indexToBeChanged].status !== status) {
      this.serviceBase.updateStatus(url, status).subscribe(
        (result: any) => {
          if (result.success === true) {
            this.toasterService.Success(result.message);
            this.dataList[indexToBeChanged].user_profile.status = status;
            this.dataList = this.dataList.concat();
          } else {
            this.toasterService.Error();
          }
        },
        err => {
          if (err instanceof TimeoutError) {
            this.toasterService.Error("", "Timeout Error");
          }
        }
      );
    }
  }

  updateStatus(url: string, id: number, status: string) {
    // if (status === 'inactive') {
    //   const data = !confirm('Are you sure you want to deactivate it');
    //   if (data) {
    //     return;
    //   }
    // }

    const indexToBeChanged = this.dataList.findIndex(entity => entity.id === id);
    if (this.dataList[indexToBeChanged].status !== status) {
      this.serviceBase.updateStatus(url, status).subscribe(
        (result: any) => {
          if (result.success === true) {
            this.toasterService.Success(result.message);
            this.dataList[indexToBeChanged].status = status;
            this.dataList = this.dataList.concat();
          } else {
            this.toasterService.Error();
          }
        },
        err => {
          if (err instanceof TimeoutError) {
            this.toasterService.Error("", "Timeout Error");
          }
        }
      );
    }
  }

  onScroll() {
    if (!this.loading && this.dataList.length < this.totalQueryableData) {
      this.getList(this.page + 10);
    }
  }


  deleteEntity(url, id) {
    // this.loading = true;
    this.serviceBase.deleteItem(url).subscribe({
      next: res => {
        this.loading = false;
        const list = this.dataList;
        const entityIndex = list.findIndex(entity => {
          if (entity.id === id) {
            return true;
          }
        });
        // removes index obtained above from list
        list.splice(entityIndex, 1);
        // enforce change detection
        this.dataList = list.concat();
        this.toasterService.Success("Deleted successfully");
      },
      error: err => {
        this.toasterService.Error("Some error occurred while deleting");
      }
    });
  }

  search() {
    this.dataList = [];
    this.dataDetails = {};
    this.getList(1);
  }


 

  ngOnDestroy() {
    this.observableSubscriptions.map(subscription => {
      subscription.unsubscribe();
    });
  }
}
