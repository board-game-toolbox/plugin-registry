import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'plugins',
})
export class PluginEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  icon_url: string;

  @Column()
  desc: string;

  @Column()
  download_url: string;
}
