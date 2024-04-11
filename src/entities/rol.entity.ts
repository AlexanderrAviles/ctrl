import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {UserEntity} from "./user.entity";

@Entity('ctrl_rol')
export class RolEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    // Relacion inversa de usuarios
    @OneToMany(() => UserEntity, usuario => usuario.rol)
    usuarios: UserEntity[];
}