import { ApiProperty } from '@nestjs/swagger';
import { modelOptions, prop, Ref } from '@typegoose/typegoose';
import { Episode } from './episode.model';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Course {
  @ApiProperty({ description: '课程名称' })
  @prop()
  title: string;

  @ApiProperty({ description: '封面图' })
  @prop()
  cover: string;

  @prop({ ref: 'Episode' })
  episodes: Ref<Episode>[];
}
