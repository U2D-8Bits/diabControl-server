/* eslint-disable prettier/prettier */
import { Inform } from "src/informs/entities/inform.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Form {

    @PrimaryGeneratedColumn()
    id_form: number;

    @Column({ type: 'varchar', length: 255, nullable: false })
    form_title: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne( () => User, user => user.forms, {onDelete: 'CASCADE'} )
    user: User;

    @OneToMany( () => Inform, inform => inform.form)
    informs: Inform[];

}

