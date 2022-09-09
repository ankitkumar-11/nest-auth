import { Users } from "src/auth/user.entity";
import { ProductEntity } from "src/product/product.entity";
import { Column } from "typeorm/decorator/columns/Column";
import { PrimaryGeneratedColumn } from "typeorm/decorator/columns/PrimaryGeneratedColumn";
import { Entity } from "typeorm/decorator/entity/Entity";
import { JoinColumn } from "typeorm/decorator/relations/JoinColumn";
import { OneToMany } from "typeorm/decorator/relations/OneToMany";
import { OneToOne } from "typeorm/decorator/relations/OneToOne";

@Entity()
export class OrderEntity {
   @PrimaryGeneratedColumn('uuid')
   id: number

   @OneToMany(() => ProductEntity, item => item.id)
   items: ProductEntity[];

   @OneToOne(() => Users, user => user.username)
   @JoinColumn()
   user : Users;

   @Column()
   subTotal: number

   @Column({ default: false })
   pending: boolean

}