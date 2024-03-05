'use client';
import AlertPopup from '@/components/AlertDialog';
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Button,
} from '@edge-ui/react';
import { useUser } from '@/lib/context/UserContext';

const ManageSubjectPage = () => {
  const user = useUser();
  const demoData = [] as any[];
  return (
    <div className="items-center w-4/5 p-8 ">
      <h1 className="font-medium text-xl text-center mb-6 ">
        {user.user?.role === 'ADMIN' ? 'Manage Subjects' : 'Subjects'}
      </h1>
      <div>
        <Table className="border rounded-2xl">
          <TableCaption className="mt-5">
            A list of the subjects presented in Swastik College
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="font-extrabold">ID</TableHead>
              <TableHead className="font-extrabold">Subject</TableHead>
              <TableHead className="font-extrabold">Staff </TableHead>
              <TableHead className="font-extrabold">Faculty </TableHead>
              {user.user?.role === 'ADMIN' ? (
                <TableHead className="font-extrabold text-right pr-6">
                  Actions
                </TableHead>
              ) : null}
            </TableRow>
          </TableHeader>
          <TableBody>
            {demoData.map((data) => (
              <TableRow key={data.id}>
                <TableCell className="font-medium">{data.id}</TableCell>
                <TableCell>{data.Subject}</TableCell>
                <TableCell>{data.Staff} </TableCell>
                <TableCell> {data.Faculty}</TableCell>

                {user.user?.role === 'ADMIN' ? (
                  <TableCell className="text-right">
                    <AlertPopup onCanceled={() => {}} onConfirmed={() => {}}>
                      <Button variant="destructive">Delete</Button>
                    </AlertPopup>
                  </TableCell>
                ) : null}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ManageSubjectPage;
