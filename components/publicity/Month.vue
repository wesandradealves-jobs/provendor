<template>
  <div style="height: 310px;">
    <ul class="list-group" style="border-left: 1px solid #60a99e;">
      <li
        class="list-group-item button d-flex justify-content-between"
        style="margin-left: 20px;"
      >
        <div>
          <span class="ml-1">{{ currentMonth.clicks }}</span>
        </div>
        <div class="d-flex align-items-center">
          <badge
            v-if="lastMonth"
            class="badge ml-2"
            :type="`${badgeType(currentMonth.clicks, lastMonth.clicks)}`"
          >
            <el-tooltip
              class="item"
              effect="dark"
              :content="
                currentMonth.clicks
                  | formatPercentage(
                    lastMonth.clicks,
                    'referente ao mês anterior'
                  )
              "
              placement="top"
            >
              <div class="d-flex">
                <span class="mr-2">{{
                  currentMonth.clicks | formatPercentage(lastMonth.clicks)
                }}</span>
                <i
                  :class="`fas fa-arrow-${arrowType(
                    currentMonth.clicks,
                    lastMonth.clicks
                  )}`"
                />
              </div>
            </el-tooltip>
          </badge>
        </div>
      </li>
      <li
        class="list-group-item button d-flex justify-content-between"
        style="margin-left: 20px;"
      >
        <div>
          <span class="ml-1">{{ currentMonth.sellsByPublicity }}</span>
        </div>
        <div class="d-flex align-items-center">
          <badge
            v-if="lastMonth"
            class="badge ml-2"
            :type="`${badgeType(
              currentMonth.sellsByPublicity,
              lastMonth.sellsByPublicity
            )}`"
          >
            <el-tooltip
              class="item"
              effect="dark"
              :content="
                currentMonth.sellsByPublicity
                  | formatPercentage(
                    lastMonth.sellsByPublicity,
                    'referente ao mês anterior'
                  )
              "
              placement="top"
            >
              <div class="d-flex">
                <span class="mr-2">{{
                  currentMonth.sellsByPublicity
                    | formatPercentage(lastMonth.sellsByPublicity)
                }}</span>
                <i
                  :class="`fas fa-arrow-${arrowType(
                    currentMonth.sellsByPublicity,
                    lastMonth.sellsByPublicity
                  )}`"
                />
              </div>
            </el-tooltip>
          </badge>
        </div>
      </li>
      <li
        class="list-group-item button d-flex justify-content-between"
        style="margin-left: 20px;"
      >
        <div>
          <span class="ml-1"> {{ currentMonth.totalSells }}</span>
        </div>
        <div class="d-flex align-items-center">
          <badge
            v-if="lastMonth"
            class="badge ml-2"
            :type="`${badgeType(
              currentMonth.totalSells,
              lastMonth.totalSells
            )}`"
          >
            <el-tooltip
              class="item"
              effect="dark"
              :content="
                currentMonth.totalSells
                  | formatPercentage(
                    lastMonth.totalSells,
                    'referente ao mês anterior'
                  )
              "
              placement="top"
            >
              <div>
                <span class="mr-2">{{
                  currentMonth.totalSells
                    | formatPercentage(lastMonth.totalSells)
                }}</span>
                <i
                  :class="`fas fa-arrow-${arrowType(
                    currentMonth.totalSells,
                    lastMonth.totalSells
                  )}`"
                />
              </div>
            </el-tooltip>
          </badge>
        </div>
      </li>
      <li
        class="list-group-item button d-flex justify-content-between"
        style="margin-left: 20px;"
      >
        <div>
          <span>{{ currentMonth.costPerClick | formatPrice }}</span>
        </div>
        <div class="d-flex align-items-center">
          <badge
            v-if="lastMonth"
            class="badge ml-2"
            :type="`${badgeType(
              currentMonth.costPerClick,
              lastMonth.costPerClick
            )}`"
          >
            <el-tooltip
              class="item"
              effect="dark"
              :content="
                currentMonth.costPerClick
                  | formatPercentage(
                    lastMonth.costPerClick,
                    'referente ao mês anterior'
                  )
              "
              placement="top"
            >
              <div>
                <span class="mr-2">{{
                  currentMonth.costPerClick
                    | formatPercentage(lastMonth.costPerClick)
                }}</span>
                <i
                  :class="`fas fa-arrow-${arrowType(
                    currentMonth.costPerClick,
                    lastMonth.costPerClick
                  )}`"
                />
              </div>
            </el-tooltip>
          </badge>
        </div>
      </li>
      <li
        class="list-group-item button d-flex justify-content-between"
        style="margin-left: 20px;"
      >
        <div>
          <span>{{ currentMonth.advertisingFee | formatPrice }}</span>
        </div>
        <div class="d-flex align-items-center">
          <badge
            v-if="lastMonth"
            class="badge ml-2"
            :type="`${badgeType(
              currentMonth.advertisingFee,
              lastMonth.advertisingFee
            )}`"
          >
            <el-tooltip
              class="item"
              effect="dark"
              :content="
                currentMonth.advertisingFee
                  | formatPercentage(
                    lastMonth.advertisingFee,
                    'referente ao mês anterior'
                  )
              "
              placement="top"
            >
              <div>
                <span class="mr-2">{{
                  currentMonth.advertisingFee
                    | formatPercentage(lastMonth.advertisingFee)
                }}</span>
                <i
                  :class="`fas fa-arrow-${arrowType(
                    currentMonth.advertisingFee,
                    lastMonth.advertisingFee
                  )}`"
                />
              </div>
            </el-tooltip>
          </badge>
        </div>
      </li>
      <li
        class="list-group-item button d-flex justify-content-between"
        style="margin-left: 20px;"
      >
        <div>
          <span>{{ currentMonth.cost | formatPrice }}</span>
        </div>
        <badge
          v-if="lastMonth"
          class="badge ml-2"
          :type="`${badgeType(currentMonth.cost, lastMonth.cost)}`"
        >
          <el-tooltip
            class="item"
            effect="dark"
            :content="
              currentMonth.cost
                | formatPercentage(lastMonth.cost, 'referente ao mês anterior')
            "
            placement="top"
          >
            <div>
              <span class="mr-2">{{
                currentMonth.cost | formatPercentage(lastMonth.cost)
              }}</span>
              <i
                :class="`fas fa-arrow-${arrowType(
                  currentMonth.cost,
                  lastMonth.cost
                )}`"
              />
            </div>
          </el-tooltip>
        </badge>
      </li>
    </ul>
  </div>
</template>

<script>
import { Tooltip } from 'element-ui'
export default {
  name: 'Month',
  components: {
    [Tooltip.name]: Tooltip
  },
  props: {
    currentMonth: {
      type: Object,
      default: null
    },
    lastMonth: {
      type: Object,
      default: null
    },
    badgeType: {
      type: Function,
      default: null
    },
    arrowType: {
      type: Function,
      default: null
    }
  }
}
</script>

<style scoped>
p {
  margin: 0;
}
.badge {
  font-size: 1rem;
  text-transform: lowercase;
}
.button {
  font-size: 1rem;
}
.button:hover {
  background: #60a99e;
  color: #fff;
  font-size: 1rem;
}

.list-group-item {
  border-radius: 0;
  padding: 0.8rem;
}

.badge {
  font-size: 0.8rem;
}
h3 {
  margin: 0;
}
</style>
