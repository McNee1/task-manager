import { AlignEndVertical, Pencil, Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { GroupSchema } from '@/entities';

export const TabGroupCard = ({ group }: { group: GroupSchema }) => {
  return (
    <Card className='shadow-md'>
      <CardHeader>
        <CardTitle className='flex cursor-pointer flex-row content-center justify-between text-xl [&_svg]:hover:opacity-100'>
          <div className='flex flex-row content-center gap-4'>
            {group.groupName}
            <Pencil
              className='mt-1 opacity-0 transition-opacity'
              strokeWidth={1.5}
              size={17}
            />
          </div>
          <AlignEndVertical
            className='mt-0.5 opacity-0 transition-opacity'
            strokeWidth={2}
            size={19}
          />
        </CardTitle>
        <CardDescription>Card Description for {group.groupName}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content for {group.groupName}</p>
      </CardContent>
      <CardFooter className='pb-3'>
        <Button
          className='w-full'
          variant='success'
          size='sm'
        >
          <Plus />
          Добавить проект
        </Button>
      </CardFooter>
    </Card>
  );
};
