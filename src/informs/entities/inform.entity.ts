/* eslint-disable prettier/prettier */
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Inform {
    @PrimaryGeneratedColumn()
    id_inform: number;

    @Column({ type: 'varchar', length: 255, nullable: false })
    inform_title: string;
    
    @Column({ type: 'text', nullable: false })
    inform_content: string;

    @ManyToOne( () => User, user => user.informs, {onDelete: 'CASCADE'} )
    user: User;
}
