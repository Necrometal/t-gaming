import { ResendCodeListener } from '@/events/listener/ResendCodeListener';
import { UserConfirmedAccountEventListener } from '@/events/listener/UserConfirmedAccountListener';
import { UserRegisteredListener } from '@/events/listener/UserRegisteredListener';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  providers: [UserRegisteredListener, ResendCodeListener, UserConfirmedAccountEventListener],
})
export class EventsListenerModule {}
