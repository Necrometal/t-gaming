import { ResendCodeListener } from '@/events/listener/ResendCodeListener';
import { UserRegisteredListener } from '@/events/listener/UserRegisteredListener';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  providers: [UserRegisteredListener, ResendCodeListener],
})
export class EventsListenerModule {}
