/* eslint-disable prettier/prettier */
import { Form } from "src/forms/entities/form.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Inform {
    @PrimaryGeneratedColumn()
    id_inform: number;

    @Column({ type: 'varchar', length: 255, nullable: false })
    inform_title: string;
    
    @Column({ type: 'jsonb', nullable: false })
    inform_content: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
    
    @ManyToOne( () => User, user => user.informs, {onDelete: 'CASCADE'} )
    user: User;

    @ManyToOne( () => Form, form => form.informs, {onDelete: 'CASCADE'} )
    form: Form;
}
