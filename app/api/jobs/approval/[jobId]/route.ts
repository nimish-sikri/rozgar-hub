import prisma from '@/lib/prisma'

interface IParams {
    jobId?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
    try{

        const body = await request.json();
        const { jobId } = params;

        const { approved } = body;

        const job = await prisma.job.update({
            where: {
                id: jobId,
            },
            data: {
                approved: approved
            }
        })

        return new Response('Ok', { status: 200 });

    } catch (error) {
      if (error instanceof Error) {
          return new Response(error.message, { status: 500 });
      } else {
          return new Response('An unknown error occurred', { status: 500 });
      }
    }
}