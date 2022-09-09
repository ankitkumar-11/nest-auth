import { CartEntity } from "src/cart/cart.entity"
import { Column } from "typeorm/decorator/columns/Column"
import { CreateDateColumn } from "typeorm/decorator/columns/CreateDateColumn"
import { PrimaryGeneratedColumn } from "typeorm/decorator/columns/PrimaryGeneratedColumn"
import { UpdateDateColumn } from "typeorm/decorator/columns/UpdateDateColumn"
import { Entity } from "typeorm/decorator/entity/Entity"
import { JoinColumn } from "typeorm/decorator/relations/JoinColumn"
import { OneToMany } from "typeorm/decorator/relations/OneToMany"

@Entity()
export class ProductEntity {
   @PrimaryGeneratedColumn("uuid")
   id!: number

   @Column()
   name: string

   @Column()
   price: number

   @Column()
   quantity: string

   @CreateDateColumn()
   createdAt: string

   @UpdateDateColumn()
   updtedAt: string

   @OneToMany(() => CartEntity, cart => cart.id)
   @JoinColumn()
   cart: CartEntity[]
}