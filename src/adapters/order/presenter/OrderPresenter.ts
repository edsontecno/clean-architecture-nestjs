import { Injectable } from '@nestjs/common';
import { Order } from 'src/application/order/entities/Order';
import { ResponseOrderDTO } from '../dto/response-order.dto';

@Injectable()
export class OrderPresenter {
  convertEntityToResponseDto(order: Order): ResponseOrderDTO {
    const response = new ResponseOrderDTO();
    response.id = order.id;
    response.total = order.total;
    response.status = order.status;
    response.awaitTime = order.awaitTime;
    response.items = [];
    if (order.items) {
      order.items.forEach((item) => {
        response.items.push({
          amount: item.amount,
          price: item.salePrice,
          product: item.productName,
        });
      });
    }

    return response;
  }

  convertArrayEntityToArrayResponseDto(orders: Order[]): ResponseOrderDTO[] {
    const newArray = [];
    if (orders) {
      orders.forEach((order) => {
        newArray.push(this.convertEntityToResponseDto(order));
      });
    }

    return newArray;
  }
}
