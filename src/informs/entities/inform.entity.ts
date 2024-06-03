/* eslint-disable prettier/prettier */
import { Form } from "src/forms/entities/form.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'tb_informs'})
export class Inform {
    @PrimaryGeneratedColumn({name:'int_id_inform'})
    id_inform: number;

    @Column({name: 'str_inform_title', type: 'varchar', length: 255, nullable: false })
    inform_title: string;
    
    @Column({ type: 'jsonb', nullable: false })
    inform_content: string;

    @CreateDateColumn({name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    created_at: Date;

    @UpdateDateColumn({name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP'})
    updated_at: Date;
    
    @ManyToOne( () => User, user => user.informs, {onDelete: 'CASCADE'} )
    user: User;

    @ManyToOne( () => Form, form => form.informs, {onDelete: 'CASCADE'} )
    form: Form;
}
