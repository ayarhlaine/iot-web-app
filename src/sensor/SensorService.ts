import { Observable, Subject } from 'rxjs';
interface RoomResponse {
  name: string;
  light: string;
  airTemperature: number;
}
export interface Room {
  name: string;
  light: string;
  airTemperature: number;
}
let roomEventSource: EventSource;
let roomsSubject: Subject<Room[]>;
const END_POINT = `${process.env.REACT_APP_END_POINT}/sensors`;
export const whenRooms = (): Observable<Room[]> => {
  if (roomEventSource === undefined || roomEventSource.readyState === EventSource.CLOSED) {
    roomEventSource = new EventSource(END_POINT);
    roomsSubject = new Subject<Room[]>();
  }

  const processMessage = (event: any) => {
    const data: RoomResponse[] = JSON.parse(event.data);
    roomsSubject.next(data);
  };

  roomEventSource.addEventListener('message', processMessage);

  return roomsSubject.asObservable();
};
export function closeRooms() {
  roomEventSource.close();
  roomsSubject.complete();
}