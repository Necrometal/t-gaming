import { UserRegisteredListener } from '@/events/listener/UserRegisteredListener';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  providers: [UserRegisteredListener],
})
export class EventsListenerModule {}
