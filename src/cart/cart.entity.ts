import { Users } from "src/auth/user.entity"
import { ProductEntity } from "src/product/product.entity"
import { Column } from "typeorm/decorator/columns/Column"
import { PrimaryGeneratedColumn } from "typeorm/decorator/columns/PrimaryGeneratedColumn"
import { Entity } from "typeorm/decorator/entity/Entity"
import { JoinColumn } from "typeorm/decorator/relations/JoinColumn"
import { ManyToOne } from "typeorm/decorator/relations/ManyToOne"

@Entity()
export class CartEntity {
   @PrimaryGeneratedColumn('uuid')
   id: number

   @Column()
   total: number

   @Column()
   quantity: number
  
   @ManyToOne(() => ProductEntity, order => order.id)
   @JoinColumn()
   item: ProductEntity

   @ManyToOne(() => Users, user => user.username)
   @JoinColumn()
   user: Users
}