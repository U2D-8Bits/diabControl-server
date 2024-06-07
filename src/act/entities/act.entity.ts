/* eslint-disable prettier/prettier */
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'tb_acts'})
export class Act {

    @PrimaryGeneratedColumn({name: 'int_id_act'})
    id: number;

    @CreateDateColumn({name: 'dat_created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    created_at: Date;

    @UpdateDateColumn({name: 'dat_updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    updated_at: Date;

    @Column({name: 'bool_minor_age', type: 'boolean', default: false})
    minor_age: boolean;

    @Column({name: 'bool_disability', type: 'boolean', default: false})
    disability: boolean;

    @Column({name: 'bool_illiteracy', type: 'boolean', default: false})
    illiteracy: boolean;

    @Column({name: 'str_tutor_name', type: 'varchar', length: 255, nullable: true})
    tutor_name: string;

    @Column({name: 'str_tutor_lastname', type: 'varchar', length: 255, nullable: true})
    tutor_lastname: string;

    @Column({name: 'str_tutor_ced', type: 'varchar', length: 10, nullable: true})
    tutor_ced: string;

    @Column({name: 'str_tutor_phone', type: 'varchar', length: 255, nullable: true})
    tutor_phone: string;

    @Column({name: 'str_tutor_email', type: 'varchar', length: 255, nullable: true})
    tutor_email: string;

    @Column({name: 'str_tutor_address', type: 'varchar', length: 255, nullable: true})
    tutor_address: string;

    @Column({name: 'str_tutor_motive', type: 'varchar', length: 255, nullable: true})
    tutor_motive: string;

    @OneToOne(() => User, user => user.act)
    @JoinColumn()
    user: User;

}
