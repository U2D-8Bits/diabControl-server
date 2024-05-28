/* eslint-disable prettier/prettier */
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Form {

    @PrimaryGeneratedColumn()
    id_form: number;

    @Column({ type: 'varchar', length: 255, nullable: false })
    form_title: string;

    @Column({ type: 'text', nullable: false })
    form_content: string;

    @ManyToOne( () => User, user => user.forms, {onDelete: 'CASCADE'} )
    user: User;

}

