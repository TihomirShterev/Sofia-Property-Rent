import { Routes, RouterModule } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { DetailsComponent } from './details/details.component';
import { ItemsComponent } from './items/items.component';

const routes: Routes = [
      {
        path: '',
        pathMatch: 'full',
        component: ItemsComponent,
        data: {
          title: 'ITEM'
        }
      },
      {
        path: 'create',
        component: CreateComponent,
        data: {
          title: 'CREATE ITEM',
          isLogged: true
        }
      },
      {
        path: 'details/:id',
        component: DetailsComponent,
        data: {
          title: 'ITEM DETAILS',
          isLogged: true
        }
      }
];

export const ItemRouterModule = RouterModule.forChild(routes);