import { useParams } from '@tanstack/react-router';
import { AlignEndVertical, Pencil, Plus } from 'lucide-react';
import { useMemo } from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useQueryGetSpaces } from '@/entities';

export const SpacePage = () => {
  const { spaceId } = useParams({ strict: false });

  const { data, isLoading } = useQueryGetSpaces();

  const getSpaceGroupById = useMemo(
    () => data?.find((item) => item.id === spaceId)?.groups ?? [],
    [data, spaceId]
  );

  if (isLoading) {
    return 'load..';
  }

  return (
    <div className='flex justify-center'>
      <Tabs
        defaultValue={getSpaceGroupById[0].id}
        className='w-full max-w-4xl'
        orientation='horizontal'
      >
        <div className='inline-flex'>
          <TabsList className='flex h-fit max-w-4xl flex-wrap justify-start gap-y-1 bg-transparent p-0'>
            {getSpaceGroupById.map((tab) => (
              <TabsTrigger
                className='bg-muted text-xs font-medium hover:bg-secondary/60'
                value={tab.id}
                key={tab.id}
              >
                {tab.groupName}
              </TabsTrigger>
            ))}
          </TabsList>
          <Button
            className='h-fit px-3 py-1.5 font-normal'
            variant={'success-ghost'}
            size='sm'
          >
            <Plus />
            Добавить группу
          </Button>
        </div>
        {getSpaceGroupById.map((tab) => (
          <TabsContent
            className='w-full'
            value={tab.id}
            key={tab.id}
          >
            <Card className='shadow-md'>
              <CardHeader>
                <CardTitle className='flex cursor-pointer flex-row content-center justify-between text-xl [&_svg]:hover:opacity-100'>
                  <div className='flex flex-row content-center gap-4'>
                    {tab.groupName}
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
                <CardDescription>Card Description for {tab.groupName}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Card Content for {tab.groupName}</p>
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
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
