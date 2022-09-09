import { CartEntity } from "src/cart/cart.entity"
import { OrderEntity } from "src/order/order.entity"
import { Column } from "typeorm/decorator/columns/Column"
import { CreateDateColumn } from "typeorm/decorator/columns/CreateDateColumn"
import { PrimaryGeneratedColumn } from "typeorm/decorator/columns/PrimaryGeneratedColumn"
import { UpdateDateColumn } from "typeorm/decorator/columns/UpdateDateColumn"
import { Entity } from "typeorm/decorator/entity/Entity"
import { JoinColumn } from "typeorm/decorator/relations/JoinColumn"
import { OneToMany } from "typeorm/decorator/relations/OneToMany"
import { OneToOne } from "typeorm/decorator/relations/OneToOne"

@Entity()
export class Users {
   @PrimaryGeneratedColumn()
   id: number

   @Column()
   username: string

   @Column()
   password: string

   @Column()
   role: string

   @CreateDateColumn()
   createdAt : string

   @UpdateDateColumn()
   updtedAt : string

   @OneToMany(() => CartEntity, cart => cart.id)
   @JoinColumn()
   cart: CartEntity[]

   @OneToOne(() => OrderEntity, order => order.id)
   @JoinColumn()
   order : OrderEntity;

   @Column({nullable:true})
   refreshToken: string;
}