/* eslint-disable prettier/prettier */
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'tb_medic_history'})
export class History {

    @PrimaryGeneratedColumn({name:'int_medic_history'})
    id_medic_history: number

    @Column({name: 'float_weight_patient', type: 'float', nullable: true})
    weight_patient: number

    @Column({name: 'float_tall_patient', type: "float", nullable: true})
    tall_patient: number

    @Column({name: 'float_pulse_patient', type: 'float', nullable: true})
    pulse_patient: number

    @Column({name: 'float_presure_patient', type: 'float', nullable: true})
    presure_patient: number

    @Column({name: 'float_frequency_patient', type: 'float', nullable: true})
    frequency_patient: number

    @Column({name: 'float_temperature_patient', type: 'float', nullable: true})
    temperature_patient: number

    @Column({name: 'str_consult_reason', type: 'varchar', length: 255, nullable: false})
    consult_reason: string

    @Column({name: 'str_fisic_exam', type: 'varchar', length: 255, nullable: false})
    fisic_exam: string

    @Column({name: 'str_recipe', type: 'varchar', length: 255, nullable: false})
    recipe: string

    @Column({name: 'str_current_illness', type: 'varchar', length: 255, nullable: false})
    current_illness: string

    @Column({name: 'str_diagnostic', type: 'varchar', length: 255, nullable: false})
    diagnostic: string

    @Column({name: 'str_medic_indications', type: 'varchar', length: 255, nullable: false})
    medic_indications: string

    @CreateDateColumn({name:'dt_created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    created_at: Date

    @UpdateDateColumn({name:'dt_updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    updated_at: Date
    
    //Relaciones
    @ManyToOne( () => User, user => user.historiesCreated)
    medico: User

    @ManyToOne( () => User, user => user.historiesRecived)
    paciente: User

}
