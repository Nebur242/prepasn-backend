import { EntityRepository, Repository } from 'typeorm';
import { CartItem } from '../entities/cart-item.entity';

@EntityRepository(CartItem)
export class CartItemsRepository extends Repository<CartItem> {}
