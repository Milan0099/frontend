import { ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { AuthService } from '../../../../core/auth/_services';


@Component({
  selector: 'app-users-control',
  templateUrl: './users-control.component.html',
  styleUrls: ['./users-control.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UsersControlComponent implements OnInit {

  displayedColumns: string[] = [ 'name', 'firstName', 'lastName', 'email', 'role', 'active', 'action'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(
    private userService: AuthService,
    private ref: ChangeDetectorRef,
  ) {}
  token: string;
  users: UserData[] = [];
  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.userService.getUsers()
      .pipe()
      .subscribe(res => {
        this.dataSource = new MatTableDataSource(res['data']);
        this.ref.detectChanges();
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });

  }
}


export interface UserData {
  firstName: string,
  lastName: string,
  name: string;
  email: string;
  role: string;
  active: string
}
