/* eslint-disable prettier/prettier */
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { History } from "src/histories/entities/history.entity";

@Entity({name: 'tb_medic_control'})
export class Control {


    @PrimaryGeneratedColumn({name:'int_medic_control'})
    id_medic_control: number

    @Column({name: 'str_id_control', type: 'varchar', length: 255, nullable: false})
    id_control: string

    @CreateDateColumn({name:'dt_created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    created_at: Date

    @Column({name: 'str_date_control_recomendation', type: 'varchar', length: 255, nullable: true})
    date_control: string

    @Column({ name: 'str_observation_control', type: 'varchar', length: 255, nullable: false })
    observation: string;

    @Column({ name: 'str_recommendations_control', type: 'text', nullable: true })
    recommendations: string;

    @ManyToOne(() => User, user => user.controlsRecived)
    paciente: User;
  
    @ManyToOne(() => User, user => user.controlsCreated)
    medico: User;

    @OneToOne(() => History, history => history.control)
    @JoinColumn()
    history: History;
}
